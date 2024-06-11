import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserUseCase } from 'src/modules/users/useCases/login-user.useCase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUserService {
  constructor(
    private loginUseUseCase: LoginUserUseCase,
    private jwtService: JwtService,
  ) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.loginUseUseCase.authUsername(username);
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      employeeId: user.employeeId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
