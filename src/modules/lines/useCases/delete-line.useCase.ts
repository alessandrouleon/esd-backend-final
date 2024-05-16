import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LineRepositoryContract } from '../repositories/line.repository.contract';
import { LineMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class DeleteLineUseCase {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
  ) {}

  async delete(id: string): Promise<void> {
    const line = await this.lineRepository.findByLineId(id);

    if (!line) {
      throw new HttpException(
        LineMessageHelper.ID_NOT_EXIST_FOR_DELETED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.lineRepository.deleteLine(id, {
      ...line,
      deletedAt: newDate(),
    });
  }
}
