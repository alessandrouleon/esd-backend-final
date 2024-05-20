import { Module } from '@nestjs/common';
import { ShiftController } from '../controllers/shift.controller';
import { CreateShiftUseCase } from '../useCases/create-shift.useCase';
import { ValidateShiftCreateService } from '../services/validate-shift.create.service';
import { ShiftRepository } from '../repositories/shift.repository';
import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';
import { DeleteShiftUseCase } from '../useCases/delete-shift.useCase';
import { GetShiftUseCase } from '../useCases/get-shift.useCase';
import { ValidateShiftUpdateService } from '../services/validate-shift.update.service';

@Module({
  controllers: [ShiftController],
  exports: [],
  providers: [
    CreateShiftUseCase,
    UpdateShiftUseCase,
    DeleteShiftUseCase,
    GetShiftUseCase,
    ValidateShiftCreateService,
    ValidateShiftUpdateService,
    {
      provide: 'ShiftRepositoryContract',
      useClass: ShiftRepository,
    },
  ],
})
export class ShiftModule {}
