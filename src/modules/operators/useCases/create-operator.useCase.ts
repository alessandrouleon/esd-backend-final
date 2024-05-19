import { Inject, Injectable } from '@nestjs/common';
import { OperatorRepositoryContract } from '../repositories/operator.repository.contract';
import { CreateOperatorDto } from '../dtos/create-operator.dto';
import { OperatorEntity } from '../entities/operator.entity';
import { ValidateOperatorService } from '../services/validate-operator.service';

@Injectable()
export class CreateOperatorUseCase {
  constructor(
    @Inject('OperatorRepositoryContract')
    private operatorRepository: OperatorRepositoryContract,
    private validateSevice: ValidateOperatorService,
  ) {}

  async execute(data: CreateOperatorDto): Promise<OperatorEntity> {
    await Promise.all([
      this.validateSevice.validateNameOnCreate(data.name),
      this.validateSevice.validateRegistrationOnCreate(data.registration),
      this.validateSevice.validateIdsOnCreate(
        data.shiftId,
        data.departmentId,
        data.lineId,
      ),
    ]);

    return await this.operatorRepository.createOperator(data);
  }
}
