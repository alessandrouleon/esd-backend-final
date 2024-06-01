import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthEmployeeService } from '../services/auth-employee.service';
import { Public } from '../public';

@Controller('auth')
export class AuthEmployeeController {
  constructor(private readonly authEmployeeService: AuthEmployeeService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login-employee')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authEmployeeService.signIn(signInDto.registration);
  }
}
