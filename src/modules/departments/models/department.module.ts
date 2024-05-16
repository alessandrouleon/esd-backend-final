import { Module } from '@nestjs/common';
import { DepartmentController } from '../controllers/department.controller';
import { CreateDepartmentUseCase } from '../useCases/create-department.useCase';
import { ValidateDepartmentService } from '../services/validate-department.service';
import { DepartmentRepository } from '../repositories/department.repository';
import { UpdateDepartmentUseCase } from '../useCases/update-department.useCase';
import { DeleteDepartmentUseCase } from '../useCases/delete-department.useCase';
import { GetDepartmentUseCase } from '../useCases/get-department.useCase';

@Module({
  controllers: [DepartmentController],
  exports: [],
  providers: [
    CreateDepartmentUseCase,
    UpdateDepartmentUseCase,
    DeleteDepartmentUseCase,
    GetDepartmentUseCase,
    ValidateDepartmentService,
    {
      provide: 'DepartmentRepositoryContract',
      useClass: DepartmentRepository,
    },
  ],
})
export class DepartmentModule {}
