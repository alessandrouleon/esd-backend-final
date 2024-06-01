import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private repository: UserRepositoryContract,
  ) {}

  async authUsername(username: string): Promise<UserEntity> {
    return await this.repository.findByUserName(username);
  }
}
