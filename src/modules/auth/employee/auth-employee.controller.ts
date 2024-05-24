import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';
import { Public } from '../public';

@Controller('auth')
export class AuthEmployeeController {
  constructor(private readonly authEmployeeService: AuthEmployeeService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('loginEmployee')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authEmployeeService.signIn(signInDto.registration);
  }
}
