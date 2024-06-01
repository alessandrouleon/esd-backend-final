import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './gateways/prisma/prisma.module';
import { ShiftModule } from './modules/shifts/models/shift.module';
import { DepartmentModule } from './modules/departments/models/department.module';
import { LineModule } from './modules/lines/models/line.module';
import { EmployeeModule } from './modules/employees/models/employee.module';
import { TesteEsdModule } from './modules/testeEsd/models/testeEsd.module';
import { AuthModule } from './modules/auth/model/auth.module';
import { UserModule } from './modules/users/models/user.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    ShiftModule,
    DepartmentModule,
    LineModule,
    EmployeeModule,
    AuthModule,
    TesteEsdModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
