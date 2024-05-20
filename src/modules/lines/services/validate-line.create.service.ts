import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LineMessageHelper } from 'src/utils/message.helps';
import { LineRepositoryContract } from '../repositories/line.repository.contract';

@Injectable()
export class ValidateLineCreateService {
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
}
