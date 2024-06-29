import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TestEsdRepositoryContract } from '../repositories/testeEsd.repository.contract';
import { CreateTestEsdDto } from '../dtos/create-testEsd.dto';
import { TestEsdEntity } from '../entities/testEsd.entity';
import { EmployeeRepositoryContract } from 'src/modules/employees/repositories/employee.repository.contract';
import { EmployeeMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class CreateTestEsdUseCase {
  constructor(
    @Inject('TestEsdRepositoryContract')
    private testEsdRepository: TestEsdRepositoryContract,
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}

  async execute(data: CreateTestEsdDto): Promise<TestEsdEntity> {
    const employee = await this.employeeRepository.findByEmployeeId(
      data.employeeId,
    );

    if (!employee) {
      throw new HttpException(
        EmployeeMessageHelper.ID_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('DATA::', data);

    return await this.testEsdRepository.createTestEsd({
      ...data,
    });
  }
}
