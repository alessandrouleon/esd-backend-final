import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../useCases/create-user.useCase';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserUseCase } from '../useCases/update-user.useCase';
import { ValidateUserUpdateService } from '../services/validate-user-update.service';
import { DeleteUserUseCase } from '../useCases/delete-user.useCase';
import { GetUserUseCase } from '../useCases/get-user.useCase';

@Module({
  controllers: [UserController],
  exports: [
    // LoginUserUseCase,

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
    {
      provide: 'UserRepositoryContract',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
