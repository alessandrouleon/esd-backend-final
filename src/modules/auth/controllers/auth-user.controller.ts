import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../public';
import { AuthUserService } from '../services/auth-user.service';

@Controller('auth')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login-user')
  signInUser(@Body() signInDto: Record<string, any>) {
    return this.authUserService.signIn(signInDto.username, signInDto.password);
  }
}
