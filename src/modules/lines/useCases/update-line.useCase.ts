import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LineRepositoryContract } from '../repositories/line.repository.contract';
import { ValidateLineService } from '../services/validate-line.service';
import { UpdateLineDto } from '../dtos/update-line.dto';
import { LineEntity } from '../entities/line.entity';
import { LineMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class UpdateLineUseCase {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
    private lineValidate: ValidateLineService,
  ) {}

  async update(id: string, data: UpdateLineDto): Promise<LineEntity> {
    const line = await this.lineRepository.findByLineId(id);

    if (!line) {
      throw new HttpException(
        LineMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await Promise.all([
      this.lineValidate.validateCodeOnUpdate(data.code, line.code),
      this.lineValidate.validateDescriptionOnUpdate(
        data.description,
        line.description,
      ),
    ]);

    return await this.lineRepository.updateLine(id, {
      ...data,
      updatedAt: newDate(),
    });
  }
}
