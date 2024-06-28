import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../useCases/create-user.useCase';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserUseCase } from '../useCases/update-user.useCase';
import { ValidateUserUpdateService } from '../services/validate-user-update.service';
import { DeleteUserUseCase } from '../useCases/delete-user.useCase';
import { GetUserUseCase } from '../useCases/get-user.useCase';
import { LoginUserUseCase } from '../useCases/login-user.useCase';
import { UpdateUserPasswordUseCase } from '../useCases/update-user-password.useCase';
import { UploadUserUseCase } from '../useCases/upload-user.useCase';
import { EmployeeModule } from 'src/modules/employees/models/employee.module';

@Module({
  controllers: [UserController],
  exports: [
    LoginUserUseCase,
    {
      provide: 'UserRepositoryContract',
      useClass: UserRepository,
    },
  ],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    ValidateUserUpdateService,
    LoginUserUseCase,
    UpdateUserPasswordUseCase,
    UploadUserUseCase,
    {
      provide: 'UserRepositoryContract',
      useClass: UserRepository,
    },
  ],
  imports: [EmployeeModule],
})
export class UserModule {}
