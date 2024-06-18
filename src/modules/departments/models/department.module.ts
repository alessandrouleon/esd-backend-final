import { Module } from '@nestjs/common';
import { DepartmentController } from '../controllers/department.controller';
import { CreateDepartmentUseCase } from '../useCases/create-department.useCase';
import { ValidateDepartmentCreateService } from '../services/validate-department.create.service';
import { DepartmentRepository } from '../repositories/department.repository';
import { UpdateDepartmentUseCase } from '../useCases/update-department.useCase';
import { DeleteDepartmentUseCase } from '../useCases/delete-department.useCase';
import { GetDepartmentUseCase } from '../useCases/get-department.useCase';
import { ValidateDepartmentUpdateService } from '../services/validate-department.update.service';
import { UploadDepartmentUseCase } from '../useCases/upload-department.useCase';

@Module({
  controllers: [DepartmentController],
  exports: [],
  providers: [
    CreateDepartmentUseCase,
    UpdateDepartmentUseCase,
    DeleteDepartmentUseCase,
    GetDepartmentUseCase,
    UploadDepartmentUseCase,
    ValidateDepartmentCreateService,
    ValidateDepartmentUpdateService,
    {
      provide: 'DepartmentRepositoryContract',
      useClass: DepartmentRepository,
    },
  ],
})
export class DepartmentModule {}
