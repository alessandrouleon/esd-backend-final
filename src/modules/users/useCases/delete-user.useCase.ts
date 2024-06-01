import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { UserMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract,
  ) {}

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new HttpException(
        UserMessageHelper.ID_NOT_EXIST_FOR_DELETED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userRepository.deleteUser(id, {
      ...user,
      deletedAt: newDate(),
    });
  }
}
