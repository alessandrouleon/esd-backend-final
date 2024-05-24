import { Module } from '@nestjs/common';
import { AuthEmployeeController } from './auth-employee.controller';
import { AuthEmployeeService } from './auth-employee.service';
import { EmployeeModule } from '../../employees/models/employee.module';
import { JwtModule } from '@nestjs/jwt';
import { authEmployeeJwtConstants } from '././auth-employee.secret';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.register({
      global: true,
      secret: authEmployeeJwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthEmployeeService],
  controllers: [AuthEmployeeController],
  exports: [AuthEmployeeService],
})
export class AuthEmployeeModule {}
