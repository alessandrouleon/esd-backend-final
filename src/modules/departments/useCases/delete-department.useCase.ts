import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';
import { DepartmentMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class DeleteDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
  ) {}

  async delete(id: string): Promise<void> {
    const department = await this.departmentRepository.findByDepartmentId(id);

    if (!department) {
      throw new HttpException(
        DepartmentMessageHelper.ID_NOT_EXIST_FOR_DELETED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.departmentRepository.deleteDepartment(id, {
      ...department,
      deletedAt: newDate(),
    });
  }
}
