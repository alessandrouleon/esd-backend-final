import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../public';
import { AuthUserService } from '../services/auth-user.service';
import { AuthEmployeeService } from '../services/auth-employee.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly authEmployeeService: AuthEmployeeService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login-user')
  signInUser(@Body() signInDto: Record<string, any>) {
    return this.authUserService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login-employee')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authEmployeeService.signIn(signInDto.registration);
  }
}
