import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class LoginEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private repository: EmployeeRepositoryContract,
  ) {}

  async authEmployeeRegistration(
    registration: string,
  ): Promise<EmployeeEntity> {
    return await this.repository.findByRegistration(registration);
  }
}
