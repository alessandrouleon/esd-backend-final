import { Module } from '@nestjs/common';
import { OperatorController } from '../controllers/operator.controller';
import { CreateOperatorUseCase } from '../useCases/create-operator.useCase';
import { OperatorRepository } from '../repositories/operator.repository';
import { ValidatesOperatorCreateService } from '../services/validates.operator.create.service';
import { UpdateOperatorUseCase } from '../useCases/update-operator.useCase';
import { ValidatesOperatorUpdateService } from '../services/validates.operator.update.service';
import { DeleteOperatorUseCase } from '../useCases/delete-operator.useCase';
// import { GetShiftUseCase } from '../useCases/get-shift.useCase';

@Module({
  controllers: [OperatorController],
  exports: [],
  providers: [
    CreateOperatorUseCase,
    UpdateOperatorUseCase,
    DeleteOperatorUseCase,
    // GetShiftUseCase,
    ValidatesOperatorCreateService,
    ValidatesOperatorUpdateService,
    {
      provide: 'OperatorRepositoryContract',
      useClass: OperatorRepository,
    },
  ],
})
export class OperatorModule {}
