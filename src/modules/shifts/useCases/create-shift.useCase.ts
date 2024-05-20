import { Inject, Injectable } from '@nestjs/common';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { ShiftEntity } from '../entities/shift.entity';
import { ValidateShiftCreateService } from '../services/validate-shift.create.service';

@Injectable()
export class CreateShiftUseCase {
  constructor(
    @Inject('ShiftRepositoryContract')
    private shiftRepository: ShiftRepositoryContract,
    private shiftService: ValidateShiftCreateService,
  ) {}

  async execute(data: CreateShiftDto): Promise<ShiftEntity> {
    await this.shiftService.validateCodeAndDescriptionOnCreate(
      data.code,
      data.description,
    );
    return await this.shiftRepository.createShift(data);
  }
}
