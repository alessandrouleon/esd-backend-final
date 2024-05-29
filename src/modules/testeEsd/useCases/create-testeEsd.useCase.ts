import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TesteEsdRepositoryContract } from '../repositories/testeEsd.repository.contract';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
import { TesteEsdEntity } from '../entities/testeEsd.entity';
import { EmployeeRepositoryContract } from 'src/modules/employees/repositories/employee.repository.contract';
import { EmployeeMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class CreateTesteEsdUseCase {
  constructor(
    @Inject('TesteEsdRepositoryContract')
    private testeEsdRepository: TesteEsdRepositoryContract,
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}

  async execute(data: CreateTesteEsdDto): Promise<TesteEsdEntity> {
    const employee = await this.employeeRepository.findByEmployeeId(
      data.employeeId,
    );

    if (!employee) {
      throw new HttpException(
        EmployeeMessageHelper.ID_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.testeEsdRepository.createTesteEsd({
      ...data,
    });
  }
}
