import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './gateways/prisma/prisma.module';
import { ShiftModule } from './modules/shifts/models/shift.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), ShiftModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
