import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { validate } from 'class-validator';
import * as XLSX from 'xlsx';

import { plainToClass } from 'class-transformer';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EmployeeRepositoryContract } from 'src/modules/employees/repositories/employee.repository.contract';

const validateAsync = (schema: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    validate(schema, { validationError: { target: false } })
      .then((response) => resolve(response.map((i) => i)))
      .catch((error: any) => reject(error));
  });
};

interface IFileUser {
  line: number;
  user: CreateUserDto;
}

@Injectable()
export class UploadUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract,
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}
  async parseExcelFile(file: any) {
    if (!file)
      throw new HttpException(
        'Arquivo não encontrado.',
        HttpStatus.BAD_REQUEST,
      );

    // Verificar a extensão do arquivo
    const fileExtension = file.originalname.split('.').pop();
    if (fileExtension !== 'xlsx') {
      throw new HttpException(
        'Tipo de arquivo inválido. Apenas arquivos .xlsx são permitidos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const type = 'Lista de Usuários';
    const workbook = XLSX.read(file.buffer);
    const sheetName = workbook.SheetNames;

    if (!Object.values(sheetName).includes(type))
      throw new HttpException(
        `Planilha tem que conter a aba de ${type}`,
        HttpStatus.BAD_REQUEST,
      );

    const sheet = workbook.Sheets[type];
    const headers = ['Nome', 'Nome de Usuário', 'Permissão', 'Status', 'Senha'];
    if (
      headers.join('') !==
      [sheet.A1.v, sheet.B1.v, sheet.C1?.v, sheet.D1?.v, sheet.E1?.v].join('')
    )
      throw new HttpException(
        'Planilha tem que conter as coluna Nome, Nome de Usuário, Permissão, Status e Senha',
        HttpStatus.BAD_REQUEST,
      );

    if (
      headers.join('') !==
      [sheet.A1.v, sheet.B1.v, sheet.C1?.v, sheet.D1?.v, sheet.E1?.v].join('')
    )
      throw new HttpException(
        ` Planilha tem que conter as colunas ${headers.join(
          ', ',
        )} respectivamente}`,
        HttpStatus.BAD_REQUEST,
      );

    const data: any = XLSX.utils.sheet_to_json(sheet);
    const users: IFileUser[] = [];
    let line = 0;
    const messagesErrors = [];

    for (const row of data) {
      const user: CreateUserDto = {
        employeeId: row['Nome'] ? row['Nome'].toString() : '',
        username: row['Nome de Usuário']
          ? row['Nome de Usuário'].toString()
          : '',
        roles: row['Permissão'] ? row['Permissão'].toString() : '',
        status: row['Status'] ? row['Status'].toString() : '',
        password: row['Senha'] ? row['Senha'].toString() : '',
      };

      line++;
      users.push({ line, user });
    }

    let totalCreated = 0;
    let alreadyExisted = 0;
    const totalToCreate = users.length;
    let result: any = [];

    for await (const item of users) {
      const existEmployee = await this.employeeRepository.findByName(
        item.user.employeeId.trim(),
      );

      item.user.employeeId = existEmployee.id;
      const userSchema = plainToClass(CreateUserDto, item.user);
      const lineE = item.line;
      const errorsTest = await validateAsync(userSchema);
      const [teste] = errorsTest;
      if (errorsTest.length > 0) {
        messagesErrors.push({
          line: lineE,
          meesage: teste,
        });
        const testew = messagesErrors.map((i) => {
          return { property: i.meesage, line: i.line };
        });

        result = testew.map((i) => [
          {
            field: i?.property.property,
            message: i?.property.constraints,
            linha: i.line + 1,
          },
        ]);
      }

      if (!errorsTest.length) {
        const existsUsername = await this.userRepository.findByUserName(
          item.user.username,
        );

        if (!existsUsername) {
          await this.userRepository.createUser({
            ...item.user,
          });
          totalCreated++;
        } else alreadyExisted++;
      }
    }

    const errors: any = {
      newUsersCreated: totalCreated,
      usersAlreadyExistent: alreadyExisted,
      quantityUsersOnSheet: totalToCreate,
      errors: result.length,
      errorsList: result,
    };

    return errors;
  }
}
