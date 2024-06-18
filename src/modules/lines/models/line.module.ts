import { Module } from '@nestjs/common';
import { LineController } from '../controllers/line.controller';
import { CreateLineUseCase } from '../useCases/create-line.useCase';
import { ValidateLineUpdateService } from '../services/validate-line.update.service';
import { LineRepository } from '../repositories/line.repository';
import { UpdateLineUseCase } from '../useCases/update-line.useCase';
import { DeleteLineUseCase } from '../useCases/delete-line.useCase';
import { GetLineUseCase } from '../useCases/get-line.useCase';
import { ValidateLineCreateService } from '../services/validate-line.create.service';
import { UploadLineUseCase } from '../useCases/upload-line.useCase';

@Module({
  controllers: [LineController],
  exports: [],
  providers: [
    CreateLineUseCase,
    UpdateLineUseCase,
    DeleteLineUseCase,
    GetLineUseCase,
    UploadLineUseCase,
    ValidateLineCreateService,
    ValidateLineUpdateService,
    {
      provide: 'LineRepositoryContract',
      useClass: LineRepository,
    },
  ],
})
export class LineModule {}
