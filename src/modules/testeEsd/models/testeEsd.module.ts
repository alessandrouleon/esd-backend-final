import { Module } from '@nestjs/common';
import { TesteEsdController } from '../controllers/testeEsd.controller';
import { CreateTesteEsdUseCase } from '../useCases/create-testeEsd.useCase';
import { TesteEsdRepository } from '../repositories/testeEsd.repository';
import { EmployeeModule } from 'src/modules/employees/models/employee.module';

@Module({
  controllers: [TesteEsdController],
  imports: [EmployeeModule],
  providers: [
    CreateTesteEsdUseCase,
    {
      provide: 'TesteEsdRepositoryContract',
      useClass: TesteEsdRepository,
    },
  ],
})
export class TesteEsdModule {}
