import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LineMessageHelper } from 'src/utils/message.helps';
import { LineRepositoryContract } from '../repositories/line.repository.contract';

@Injectable()
export class ValidateLineService {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
  ) {}

  async validateCodeAndDescriptionOnCreate(
    code: string,
    description: string,
  ): Promise<void> {
    const [existCode, existeDescription] = await Promise.all([
      this.lineRepository.findByCode(code),
      this.lineRepository.findByDecription(description),
    ]);

    if (existCode) {
      throw new HttpException(
        LineMessageHelper.EXIST_CODE,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existeDescription) {
      throw new HttpException(
        LineMessageHelper.EXIST_DESCRIPTION,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateCodeOnUpdate(newCode: string, oldCode: string): Promise<void> {
    if (newCode !== oldCode) {
      const existCode = await this.lineRepository.findByCode(newCode);
      if (existCode) {
        throw new HttpException(
          LineMessageHelper.EXIST_CODE,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async validateDescriptionOnUpdate(
    newDescription: string,
    oldDescription: string,
  ): Promise<void> {
    if (newDescription !== oldDescription) {
      const existDescription =
        await this.lineRepository.findByDecription(newDescription);

      if (existDescription) {
        throw new HttpException(
          LineMessageHelper.EXIST_DESCRIPTION,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
