import { Inject, Injectable } from '@nestjs/common';
import { LineRepositoryContract } from '../repositories/line.repository.contract';
import { CreateLineDto } from '../dtos/create-line.dto';
import { LineEntity } from '../entities/line.entity';
import { ValidateLineCreateService } from '../services/validate-line.create.service';

@Injectable()
export class CreateLineUseCase {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
    private lineService: ValidateLineCreateService,
  ) {}

  async execute(data: CreateLineDto): Promise<LineEntity> {
    await this.lineService.validateCodeAndDescriptionOnCreate(
      data.code,
      data.description,
    );
    return await this.lineRepository.createLine(data);
  }
}
