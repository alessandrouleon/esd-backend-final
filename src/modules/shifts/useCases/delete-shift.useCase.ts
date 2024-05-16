import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';
import { ShiftMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class DeleteShiftUseCase {
  constructor(
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
  ) {}

  async delete(id: string): Promise<void> {
    const shift = await this.shiftRepository.findByShiftId(id);

    if (!shift) {
      throw new HttpException(
        ShiftMessageHelper.ID_NOT_EXIST_FOR_DELETED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.shiftRepository.deleteShift(id, {
      ...shift,
      deletedAt: newDate(),
    });
  }
}
