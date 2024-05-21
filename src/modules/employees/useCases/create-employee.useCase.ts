import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { ValidatesEmployeeCreateService } from '../services/validates.employee.create.service';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
    private validateSevice: ValidatesEmployeeCreateService,
  ) {}

  async execute(data: CreateEmployeeDto): Promise<EmployeeEntity> {
    await Promise.all([
      this.validateSevice.validateNameOnCreate(data.name),
      this.validateSevice.validateRegistrationOnCreate(data.registration),
      this.validateSevice.validateIdsOnCreate(
        data.shiftId,
        data.departmentId,
        data.lineId,
      ),
    ]);

    return await this.employeeRepository.createEmployee(data);
  }
}
