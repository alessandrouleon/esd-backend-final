import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './gateways/prisma/prisma.module';
import { ShiftModule } from './modules/shifts/models/shift.module';
import { DepartmentModule } from './modules/departments/models/department.module';
import { LineModule } from './modules/lines/models/line.module';
import { EmployeeModule } from './modules/employees/models/employee.module';
import { TesteEsdModule } from './modules/testeEsd/models/testeEsd.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    ShiftModule,
    DepartmentModule,
    LineModule,
    EmployeeModule,
    TesteEsdModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
