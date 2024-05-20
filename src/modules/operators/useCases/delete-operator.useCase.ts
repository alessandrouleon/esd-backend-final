import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OperatorRepositoryContract } from '../repositories/operator.repository.contract';
import { OperatorMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class DeleteOperatorUseCase {
  constructor(
    @Inject('OperatorRepositoryContract')
    private operatorRepository: OperatorRepositoryContract,
  ) {}

  async delete(id: string): Promise<void> {
    const shift = await this.operatorRepository.findByOperatorId(id);

    if (!shift) {
      throw new HttpException(
        OperatorMessageHelper.ID_NOT_EXIST_FOR_DELETED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.operatorRepository.deleteOperator(id, {
      ...shift,
      deletedAt: newDate(),
    });
  }
}
