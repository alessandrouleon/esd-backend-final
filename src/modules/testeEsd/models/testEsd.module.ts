import { Module } from '@nestjs/common';
import { TesteEsdController } from '../controllers/testeEsd.controller';
import { CreateTestEsdUseCase } from '../useCases/create-testEsd.useCase';
import { TestEsdRepository } from '../repositories/testeEsd.repository';
import { EmployeeModule } from 'src/modules/employees/models/employee.module';
import { GetTestEsdUseCase } from '../useCases/get-testEsd.useCase';
import { FilterTestEsdUseCase } from '../useCases/filter-testEsd.useCase';

@Module({
  controllers: [TesteEsdController],
  imports: [EmployeeModule],
  providers: [
    CreateTestEsdUseCase,
    GetTestEsdUseCase,
    FilterTestEsdUseCase,
    {
      provide: 'TestEsdRepositoryContract',
      useClass: TestEsdRepository,
    },
  ],
})
export class TestEsdModule {}
