import { Module } from '@nestjs/common';
import { EmployeeController } from '../controllers/employee.controller';
import { CreateEmployeeUseCase } from '../useCases/create-employee.useCase';
import { EmployeeRepository } from '../repositories/employee.repository';
import { ValidatesEmployeeCreateService } from '../services/validates.employee.create.service';
import { UpdateEmployeeUseCase } from '../useCases/update-employee.useCase';
import { ValidatesEmployeeUpdateService } from '../services/validates.employee.update.service';
import { DeleteEmployeeUseCase } from '../useCases/delete-employee.useCase';
import { GetEmployeeUseCase } from '../useCases/get-employee.useCase';

@Module({
  controllers: [EmployeeController],
  exports: [],
  providers: [
    CreateEmployeeUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    GetEmployeeUseCase,
    ValidatesEmployeeCreateService,
    ValidatesEmployeeUpdateService,
    {
      provide: 'EmployeeRepositoryContract',
      useClass: EmployeeRepository,
    },
  ],
})
export class EmployeeModule {}
