import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';
import { jwtConstants } from '../constants/auth-user.secret';
import { AuthUserService } from '../services/auth-user.service';
import { AuthEmployeeService } from '../services/auth-employee.service';
import { UserModule } from 'src/modules/users/models/user.module';
import { EmployeeModule } from 'src/modules/employees/models/employee.module';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    EmployeeModule,
  ],
  providers: [AuthUserService, AuthEmployeeService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthUserService],
})
export class AuthModule {}
