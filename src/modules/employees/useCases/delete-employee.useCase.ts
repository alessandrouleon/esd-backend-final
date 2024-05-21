import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { EmployeeMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}

  async delete(id: string): Promise<void> {
    const shift = await this.employeeRepository.findByEmployeeId(id);

    if (!shift) {
      throw new HttpException(
        EmployeeMessageHelper.ID_NOT_EXIST_FOR_DELETED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.employeeRepository.deleteEmployee(id, {
      ...shift,
      deletedAt: newDate(),
    });
  }
}
