import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './gateways/prisma/prisma.module';
import { ShiftModule } from './modules/shifts/models/shift.module';
import { DepartmentModule } from './modules/departments/models/department.module';
import { LineModule } from './modules/lines/models/line.module';
import { OperatorModule } from './modules/operators/models/operator.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    ShiftModule,
    DepartmentModule,
    LineModule,
    OperatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
