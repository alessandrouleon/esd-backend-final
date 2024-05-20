import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OperatorRepositoryContract } from '../repositories/operator.repository.contract';
import { ValidatesOperatorUpdateService } from '../services/validates.operator.update.service';
import { UpdateOperatorDto } from '../dtos/update-operator.dto';
import { OperatorEntity } from '../entities/operator.entity';
import { OperatorMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class UpdateOperatorUseCase {
  constructor(
    @Inject('OperatorRepositoryContract')
    private operatorRepository: OperatorRepositoryContract,
    private validateSevice: ValidatesOperatorUpdateService,
  ) {}

  async update(id: string, data: UpdateOperatorDto): Promise<OperatorEntity> {
    const operator = await this.operatorRepository.findByOperatorId(id);

    if (!operator) {
      throw new HttpException(
        OperatorMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await Promise.all([
      this.validateSevice.validateNameOnUpdate(data.name, operator.name),
      this.validateSevice.validateRegistrationOnUpdate(
        data.registration,
        operator.registration,
      ),
      this.validateSevice.validateIdsOnUpdate(
        data.shiftId,
        data.departmentId,
        data.lineId,
      ),
    ]);

    return await this.operatorRepository.updateOperator(id, {
      ...data,
      updatedAt: newDate(),
    });
  }
}
