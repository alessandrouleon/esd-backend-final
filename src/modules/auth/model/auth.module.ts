import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtUserStrategy } from '../strategies/jwt-user.strategy';
import { JwtEmployeeStrategy } from '../strategies/jwt-employee.strategy';
import { AuthUserGuard } from '../guard/auth-user.guard';
import { AuthEmployeeGuard } from '../guard/auth-employee.guard';
import { authUserJwtConstants } from '../constants/auth-user.secret';
import { authEmployeeJwtConstants } from '../constants/auth-employee.secret';
import { AuthUserService } from '../services/auth-user.service';
import { AuthEmployeeService } from '../services/auth-employee.service';
import { UserModule } from 'src/modules/users/models/user.module';
import { EmployeeModule } from 'src/modules/employees/models/employee.module';
import { AuthEmployeeController } from '../controllers/auth-employee.controller';
import { AuthUserController } from '../controllers/auth-user.controller';

@Module({
  imports: [
    EmployeeModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: authUserJwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
    JwtModule.register({
      global: true,
      secret: authEmployeeJwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  providers: [
    AuthUserService,
    AuthEmployeeService,
    JwtUserStrategy,
    JwtEmployeeStrategy,
    AuthUserGuard,
    AuthEmployeeGuard,
  ],
  controllers: [AuthEmployeeController, AuthUserController],
  exports: [AuthEmployeeService, AuthUserService],
})
export class AuthModule {}
