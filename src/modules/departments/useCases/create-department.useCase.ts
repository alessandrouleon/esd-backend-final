import { Inject, Injectable } from '@nestjs/common';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { DepartmentEntity } from '../entities/department.entity';
import { ValidateDepartmentService } from '../services/validate-department.service';

@Injectable()
export class CreateDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
    private departmentService: ValidateDepartmentService,
  ) {}

  async execute(data: CreateDepartmentDto): Promise<DepartmentEntity> {
    await this.departmentService.validateCodeAndDescriptionOnCreate(
      data.code,
      data.description,
    );
    const department = await this.departmentRepository.createDepartment(data);
    return department;
  }
}