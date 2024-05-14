import { Inject, Injectable } from '@nestjs/common';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { ShiftEntity } from '../entities/shift.entity';
import { ValidateShiftService } from '../services/validate-shift.service';

@Injectable()
export class CreateShiftUseCase {
  constructor(
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
    private shiftService: ValidateShiftService,
  ) {}

  async execute(data: CreateShiftDto): Promise<ShiftEntity> {
    await this.shiftService.validatesShiftCodeAndDescription(
      data.code,
      data.description,
    );
    const shift = await this.shiftRepository.createShift(data);
    return shift;
  }
}
