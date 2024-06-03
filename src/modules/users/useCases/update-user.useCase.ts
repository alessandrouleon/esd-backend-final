import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';
import { ValidateUserUpdateService } from '../services/validate-user-update.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract,
    private validateService: ValidateUserUpdateService,
  ) {}

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const userId = await this.userRepository.findByUserId(id);

    if (!userId) {
      throw new HttpException(
        UserMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await Promise.all([
      this.validateService.validateUsernameOnUpdate(
        data.username,
        userId.username,
      ),
      this.validateService.validateEmployeeIdOnUpdate(
        data.employeeId,
        userId.employeeId,
      ),
    ]);

    const hashedUserPassword = await bcrypt.hash(
      data.password,
      Number(process.env.BCRYPTROUNDS),
    );

    return await this.userRepository.updateUser(id, {
      ...data,
      updatedAt: newDate(),
      password: hashedUserPassword,
    });
  }
}
