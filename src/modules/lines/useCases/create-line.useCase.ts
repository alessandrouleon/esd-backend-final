import { Inject, Injectable } from '@nestjs/common';
import { LineRepositoryContract } from '../repositories/line.repository.contract';
import { CreateLineDto } from '../dtos/create-line.dto';
import { LineEntity } from '../entities/line.entity';
import { ValidateLineService } from '../services/validate-line.service';

@Injectable()
export class CreateLineUseCase {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
    private lineService: ValidateLineService,
  ) {}

  async execute(data: CreateLineDto): Promise<LineEntity> {
    await this.lineService.validateCodeAndDescriptionOnCreate(
      data.code,
      data.description,
    );
    const line = await this.lineRepository.createLine(data);
    return line;
  }
}
