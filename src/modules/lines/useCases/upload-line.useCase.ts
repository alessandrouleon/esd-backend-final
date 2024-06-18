import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LineRepositoryContract } from '../repositories/line.repository.contract';
import { validate } from 'class-validator';
import * as XLSX from 'xlsx';

import { plainToClass } from 'class-transformer';
import { CreateLineDto } from '../dtos/create-line.dto';

const validateAsync = (schema: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    validate(schema, { validationError: { target: false } })
      .then((response) => resolve(response.map((i) => i)))
      .catch((error: any) => reject(error));
  });
};

interface IFileLine {
  line: number;
  createLine: CreateLineDto;
}

@Injectable()
export class UploadLineUseCase {
  constructor(
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

    const type = 'Lista de linhas';
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
    const lines: IFileLine[] = [];

    let line = 0;
    const messagesErrors = [];

    for (const row of data) {
      const createLine: CreateLineDto = {
        code: row['CÓDIGO'] ? row['CÓDIGO'].toString() : '',
        description: row['DESCRIÇÃO'] ? row['DESCRIÇÃO'].toString() : '',
      };

      line++;
      lines.push({ line, createLine });
    }
    let totalCreated = 0;
    let alreadyExisted = 0;
    const totalToCreate = lines.length;
    let result: any = [];
    for await (const item of lines) {
      const lineSchema = plainToClass(CreateLineDto, item.createLine);
      const lineE = item.line;
      const errorsTest = await validateAsync(lineSchema);
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
        const existsLineCode = await this.lineRepository.findByCode(
          item.createLine.code,
        );
        const existsLineDescription = await this.lineRepository.findByCode(
          item.createLine.description,
        );

        if (!existsLineCode && !existsLineDescription) {
          await this.lineRepository.createLine({
            ...item.createLine,
          });
          totalCreated++;
        } else alreadyExisted++;
      }
    }

    const errors: any = {
      newLinesCreated: totalCreated,
      linesAlreadyExistent: alreadyExisted,
      quantityLinesOnSheet: totalToCreate,
      errors: result.length,
      errorsList: result,
    };

    return errors;
  }
}
