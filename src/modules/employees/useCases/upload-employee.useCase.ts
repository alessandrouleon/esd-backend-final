import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { validate } from 'class-validator';
import * as XLSX from 'xlsx';

import { plainToClass } from 'class-transformer';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { DepartmentRepositoryContract } from 'src/modules/departments/repositories/department.repository.contract';
import { ShiftRepositoryContract } from 'src/modules/shifts/repositories/shift.repository.contract';
import { LineRepositoryContract } from 'src/modules/lines/repositories/line.repository.contract';
import {
  DepartmentMessageHelper,
  LineMessageHelper,
  ShiftMessageHelper,
} from 'src/utils/message.helps';

const validateAsync = (schema: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    validate(schema, { validationError: { target: false } })
      .then((response) => resolve(response.map((i) => i)))
      .catch((error: any) => reject(error));
  });
};

interface IFileEmployee {
  line: number;
  employee: CreateEmployeeDto;
}

@Injectable()
export class UploadEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
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

    const type = 'Lista de Funcionários';
    const workbook = XLSX.read(file.buffer);
    const sheetName = workbook.SheetNames;

    if (!Object.values(sheetName).includes(type))
      throw new HttpException(
        `Planilha tem que conter a aba de ${type}`,
        HttpStatus.BAD_REQUEST,
      );

    const sheet = workbook.Sheets[type];
    const headers = [
      'Nome',
      'Matrícula',
      'Bota',
      'Pulseira',
      'Status',
      'Ocupação',
      'Departamento',
      'Turno',
      'Linha',
    ];
    if (
      headers.join('') !==
      [
        sheet.A1.v,
        sheet.B1.v,
        sheet.C1?.v,
        sheet.D1?.v,
        sheet.E1?.v,
        sheet.F1?.v,
        sheet.G1?.v,
        sheet.H1?.v,
        sheet.I1?.v,
      ].join('')
    )
      throw new HttpException(
        'Planilha tem que conter as coluna Nome,Matrícula,Bota, Pulseira, Status, Ocupação, Departamento, Turno, Linha',
        HttpStatus.BAD_REQUEST,
      );

    if (
      headers.join('') !==
      [
        sheet.A1.v,
        sheet.B1.v,
        sheet.C1?.v,
        sheet.D1?.v,
        sheet.E1?.v,
        sheet.F1?.v,
        sheet.G1?.v,
        sheet.H1?.v,
        sheet.I1?.v,
      ].join('')
    )
      throw new HttpException(
        ` Planilha tem que conter as colunas ${headers.join(
          ', ',
        )} respectivamente}`,
        HttpStatus.BAD_REQUEST,
      );

    const data: any = XLSX.utils.sheet_to_json(sheet);
    const employees: IFileEmployee[] = [];
    let line = 0;
    const messagesErrors = [];

    for (const row of data) {
      const employee: CreateEmployeeDto = {
        name: row['Nome'] ? row['Nome'].toString() : '',
        registration: row['Matrícula'] ? row['Matrícula'].toString() : '',
        boot: row['Bota'] ? row['Bota'].toString() : '',
        bracelete: row['Pulseira'] ? row['Pulseira'].toString() : '',
        status: row['Status'] ? row['Status'].toString() : '',
        occupation: row['Ocupação'] ? row['Ocupação'].toString() : '',
        departmentId: row['Departamento'] ? row['Departamento'].toString() : '',
        shiftId: row['Turno'] ? row['Turno'].toString() : '',
        lineId: row['Linha'] ? row['Linha'].toString() : '',
      };

      line++;
      employees.push({ line, employee });
    }

    let totalCreated = 0;
    let alreadyExisted = 0;
    const totalToCreate = employees.length;
    let result: any = [];

    for await (const item of employees) {
      const existDepartment = await this.departmentRepository.findByDecription(
        item.employee.departmentId.trim(),
      );

      const existShift = await this.shiftRepository.findByDecription(
        item.employee.shiftId.trim(),
      );

      const existLine = await this.lineRepository.findByCode(
        item.employee.lineId.trim(),
      );

      if (!existDepartment) {
        throw new HttpException(
          DepartmentMessageHelper.ID_NOT_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!existShift) {
        throw new HttpException(
          ShiftMessageHelper.ID_NOT_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!existLine) {
        throw new HttpException(
          LineMessageHelper.ID_NOT_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }

      item.employee.departmentId = existDepartment.id;
      item.employee.shiftId = existShift.id;
      item.employee.lineId = existLine.id;
      const employeeSchema = plainToClass(CreateEmployeeDto, item.employee);
      const lineE = item.line;
      const errorsTest = await validateAsync(employeeSchema);
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
        const existsEmployeeRegistration =
          await this.employeeRepository.findByRegistration(
            item.employee.registration,
          );
        const existsEmployeeDescription =
          await this.employeeRepository.findByName(item.employee.name);

        if (!existsEmployeeRegistration && !existsEmployeeDescription) {
          await this.employeeRepository.createEmployee({
            ...item.employee,
          });
          totalCreated++;
        } else alreadyExisted++;
      }
    }

    const errors: any = {
      newEmployeesCreated: totalCreated,
      employeesAlreadyExistent: alreadyExisted,
      quantityEmployeesOnSheet: totalToCreate,
      errors: result.length,
      errorsList: result,
    };

    return errors;
  }
}
