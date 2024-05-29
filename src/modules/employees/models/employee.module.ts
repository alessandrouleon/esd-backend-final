import { Module } from '@nestjs/common';
import { EmployeeController } from '../controllers/employee.controller';
import { CreateEmployeeUseCase } from '../useCases/create-employee.useCase';
import { EmployeeRepository } from '../repositories/employee.repository';
import { ValidatesEmployeeCreateService } from '../services/validates.employee.create.service';
import { UpdateEmployeeUseCase } from '../useCases/update-employee.useCase';
import { ValidatesEmployeeUpdateService } from '../services/validates.employee.update.service';
import { DeleteEmployeeUseCase } from '../useCases/delete-employee.useCase';
import { GetEmployeeUseCase } from '../useCases/get-employee.useCase';
import { UploadEmployeeImageService } from 'src/infrastructure/supabase/storage/service/upload-employee-image.service';
import { GetEmployeeImageService } from 'src/infrastructure/supabase/storage/service/get-employee-image.service';
import { LoginEmployeeUseCase } from '../useCases/login-employee.useCase';
import { GetSingleEmployeeUseCase } from '../useCases/get-single-employee.useCase';

@Module({
  controllers: [EmployeeController],
  exports: [
    LoginEmployeeUseCase,

    {
      provide: 'EmployeeRepositoryContract',
      useClass: EmployeeRepository,
    },
  ],
  providers: [
    CreateEmployeeUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    GetEmployeeUseCase,
    ValidatesEmployeeCreateService,
    ValidatesEmployeeUpdateService,
    UploadEmployeeImageService,
    GetEmployeeImageService,
    LoginEmployeeUseCase,
    GetSingleEmployeeUseCase,
    {
      provide: 'EmployeeRepositoryContract',
      useClass: EmployeeRepository,
    },
  ],
})
export class EmployeeModule {}
