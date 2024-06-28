import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { UserEntity } from '../entities/user.entity';
import { UserMessageHelper } from 'src/utils/message.helps';
import { UpdateUserPasswordDto } from '../dtos/update-user-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract,
  ) {}

  async updatePassword(
    id: string,
    data: UpdateUserPasswordDto,
  ): Promise<UserEntity> {
    const userId = await this.userRepository.findByUserId(id);

    if (!userId) {
      throw new HttpException(
        UserMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedUserPassword = await bcrypt.hash(
      data.password,
      Number(process.env.BCRYPTROUNDS),
    );

    return await this.userRepository.updateUserPassword(id, {
      ...data,
      password: hashedUserPassword,
    });
  }
}
