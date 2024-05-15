import { Module } from '@nestjs/common';
import { ShiftController } from '../controllers/shift.controller';
import { CreateShiftUseCase } from '../useCases/create-shift.useCase';
import { ValidateShiftService } from '../services/validate-shift.service';
import { ShiftRepository } from '../repositories/shift.repository';
import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';

@Module({
  controllers: [ShiftController],
  exports: [],
  providers: [
    CreateShiftUseCase,
    UpdateShiftUseCase,
    ValidateShiftService,
    {
      provide: 'ShiftRepositoryContract',
      useClass: ShiftRepository,
    },
  ],
})
export class ShiftModule {}
