import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';
import { ValidateShiftUpdateService } from '../services/validate-shift.update.service';
import { UpdateShiftDto } from '../dtos/update-shift.dto';
import { ShiftEntity } from '../entities/shift.entity';
import { ShiftMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class UpdateShiftUseCase {
  constructor(
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
    private shiftValidate: ValidateShiftUpdateService,
  ) {}

  async update(id: string, data: UpdateShiftDto): Promise<ShiftEntity> {
    const shift = await this.shiftRepository.findByShiftId(id);

    if (!shift) {
      throw new HttpException(
        ShiftMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await Promise.all([
      this.shiftValidate.validateCodeOnUpdate(data.code, shift.code),
      this.shiftValidate.validateDescriptionOnUpdate(
        data.description,
        shift.description,
      ),
    ]);

    return await this.shiftRepository.updateShift(id, {
      ...data,
      updatedAt: newDate(),
    });
  }
}
