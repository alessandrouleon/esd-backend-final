import { Module } from '@nestjs/common';
import { LineController } from '../controllers/line.controller';
import { CreateLineUseCase } from '../useCases/create-line.useCase';
import { ValidateLineService } from '../services/validate-line.service';
import { LineRepository } from '../repositories/line.repository';
import { UpdateLineUseCase } from '../useCases/update-line.useCase';
import { DeleteLineUseCase } from '../useCases/delete-line.useCase';
import { GetLineUseCase } from '../useCases/get-line.useCase';

@Module({
  controllers: [LineController],
  exports: [],
  providers: [
    CreateLineUseCase,
    UpdateLineUseCase,
    DeleteLineUseCase,
    GetLineUseCase,
    ValidateLineService,
    {
      provide: 'LineRepositoryContract',
      useClass: LineRepository,
    },
  ],
})
export class LineModule {}
