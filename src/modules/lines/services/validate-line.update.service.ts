import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LineMessageHelper } from 'src/utils/message.helps';
import { LineRepositoryContract } from '../repositories/line.repository.contract';

@Injectable()
export class ValidateLineUpdateService {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
  ) {}

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
