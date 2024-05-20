import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShiftMessageHelper } from 'src/utils/message.helps';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';

@Injectable()
export class ValidateShiftCreateService {
  constructor(
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
  ) {}

  async validateCodeAndDescriptionOnCreate(
    code: string,
    description: string,
  ): Promise<void> {
    const [existCode, existeDescription] = await Promise.all([
      this.shiftRepository.findByCode(code),
      this.shiftRepository.findByDecription(description),
    ]);

    if (existCode) {
      throw new HttpException(
        ShiftMessageHelper.EXIST_CODE,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existeDescription) {
      throw new HttpException(
        ShiftMessageHelper.EXIST_DESCRIPTION,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
