import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { UserEntity } from '../entities/user.entity';
import { UserMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private repository: UserRepositoryContract,
  ) {}

  async authUsername(username: string): Promise<UserEntity> {
    const user = await this.repository.findByUserName(username);

    if (!user) {
      throw new HttpException(
        UserMessageHelper.INVALID_USERNAME_OR_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
