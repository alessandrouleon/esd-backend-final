import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';
import { ValidateDepartmentService } from '../services/validate-department.service';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';
import { DepartmentEntity } from '../entities/department.entity';
import { DepartmentMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class UpdateDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
    private departmentValidate: ValidateDepartmentService,
  ) {}

  async update(
    id: string,
    data: UpdateDepartmentDto,
  ): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findByDepartmentId(id);

    if (!department) {
      throw new HttpException(
        DepartmentMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await Promise.all([
      this.departmentValidate.validateCodeOnUpdate(data.code, department.code),
      this.departmentValidate.validateDescriptionOnUpdate(
        data.description,
        department.description,
      ),
    ]);

    return await this.departmentRepository.updateDepartment(id, {
      ...data,
      updatedAt: newDate(),
    });
  }
}
