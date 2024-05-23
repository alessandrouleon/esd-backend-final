import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShiftMessageHelper } from 'src/utils/message.helps';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';

@Injectable()
export class ValidateShiftUpdateService {
  constructor(
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
  ) {}

  async validateCodeOnUpdate(newCode: string, oldCode: string): Promise<void> {
    if (newCode !== oldCode) {
      const existCode = await this.shiftRepository.findByCode(newCode);
      if (existCode) {
        throw new HttpException(
          ShiftMessageHelper.EXIST_CODE,
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
        await this.shiftRepository.findByDecription(newDescription);

      if (existDescription) {
        throw new HttpException(
          ShiftMessageHelper.EXIST_DESCRIPTION,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}