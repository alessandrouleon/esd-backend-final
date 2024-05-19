import { Module } from '@nestjs/common';
import { OperatorController } from '../controllers/operator.controller';
import { CreateOperatorUseCase } from '../useCases/create-operator.useCase';
import { OperatorRepository } from '../repositories/operator.repository';
import { ValidateOperatorService } from '../services/validate-operator.service';
// import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';
// import { DeleteShiftUseCase } from '../useCases/delete-shift.useCase';
// import { GetShiftUseCase } from '../useCases/get-shift.useCase';

@Module({
  controllers: [OperatorController],
  exports: [],
  providers: [
    CreateOperatorUseCase,
    // UpdateShiftUseCase,
    // DeleteShiftUseCase,
    // GetShiftUseCase,
    ValidateOperatorService,
    {
      provide: 'OperatorRepositoryContract',
      useClass: OperatorRepository,
    },
  ],
})
export class OperatorModule {}
