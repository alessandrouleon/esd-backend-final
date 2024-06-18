import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';
import { validate } from 'class-validator';
import * as XLSX from 'xlsx';

import { plainToClass } from 'class-transformer';
import { CreateDepartmentDto } from '../dtos/create-department.dto';

const validateAsync = (schema: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    validate(schema, { validationError: { target: false } })
      .then((response) => resolve(response.map((i) => i)))
      .catch((error: any) => reject(error));
  });
};

interface IFileDepartment {
  line: number;
  department: CreateDepartmentDto;
}

@Injectable()
export class UploadDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
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

    const type = 'Lista de Departamento';
    const workbook = XLSX.read(file.buffer);
    const sheetName = workbook.SheetNames;

    if (!Object.values(sheetName).includes(type))
      throw new HttpException(
        `Planilha tem que conter a aba de ${type}`,
        HttpStatus.BAD_REQUEST,
      );

    const sheet = workbook.Sheets[type];
    const headers = ['CÓDIGO', 'DESCRIÇÃO'];
    if (headers.join('') !== [sheet.A1?.v, sheet.B1?.v].join(''))
      throw new HttpException(
        'Planilha tem que conter as colunas CÓDIGO E DESCRIÇÃO.',
        HttpStatus.BAD_REQUEST,
      );

    if (headers.join('') !== [sheet.A1.v, sheet.B1.v].join(''))
      throw new HttpException(
        ` Planilha tem que conter as colunas ${headers.join(
          ', ',
        )} respectivamente}`,
        HttpStatus.BAD_REQUEST,
      );

    const data: any = XLSX.utils.sheet_to_json(sheet);
    const departments: IFileDepartment[] = [];

    let line = 0;
    const messagesErrors = [];

    for (const row of data) {
      const department: CreateDepartmentDto = {
        code: row['CÓDIGO'] ? row['CÓDIGO'].toString() : '',
        description: row['DESCRIÇÃO'] ? row['DESCRIÇÃO'].toString() : '',
      };

      line++;
      departments.push({ line, department });
    }
    let totalCreated = 0;
    let alreadyExisted = 0;
    const totalToCreate = departments.length;
    let result: any = [];
    for await (const item of departments) {
      const departmentSchema = plainToClass(
        CreateDepartmentDto,
        item.department,
      );
      const lineE = item.line;
      const errorsTest = await validateAsync(departmentSchema);
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
        const existsDepartmentCode = await this.departmentRepository.findByCode(
          item.department.code,
        );
        const existsDepartmentDescription =
          await this.departmentRepository.findByDecription(
            item.department.description,
          );

        if (!existsDepartmentCode && !existsDepartmentDescription) {
          await this.departmentRepository.createDepartment({
            ...item.department,
          });
          totalCreated++;
        } else alreadyExisted++;
      }
    }

    const errors: any = {
      newDepartmentsCreated: totalCreated,
      departmentsAlreadyExistent: alreadyExisted,
      quantityDepartmentsOnSheet: totalToCreate,
      errors: result.length,
      errorsList: result,
    };

    return errors;
  }
}
