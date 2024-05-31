import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginEmployeeUseCase } from '../../employees/useCases/login-employee.useCase';
import { EmployeeMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class AuthEmployeeService {
  constructor(
    private loginEmployeeUseCase: LoginEmployeeUseCase,
    private jwtService: JwtService,
  ) {}
  async signIn(registration: string): Promise<{ token: string }> {
    if (registration.trim().length === 0) {
      throw new HttpException(
        EmployeeMessageHelper.EMPTY_REGISTRATION,
        HttpStatus.BAD_REQUEST,
      );
    }
    const employee =
      await this.loginEmployeeUseCase.authEmployeeRegistration(registration);

    if (!employee) {
      throw new HttpException(
        EmployeeMessageHelper.REGISTRATION_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: employee.id, registration: employee.registration };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
