import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authEmployeeJwtConstants } from '../constants/auth-employee.secret';

@Injectable()
export class JwtEmployeeStrategy extends PassportStrategy(
  Strategy,
  'jwt-employee',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authEmployeeJwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { employeeId: payload.sub, registration: payload.registration };
  }
}
