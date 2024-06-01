import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract,
  ) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const userName = await this.userRepository.findByUserName(data.username);
    const employeeId = await this.userRepository.findByEmployeeId(
      data.employeeId,
    );

    if (userName) {
      throw new HttpException(
        UserMessageHelper.EXIST_USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!employeeId) {
      throw new HttpException(
        UserMessageHelper.ID_EMPLOYEE_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.createUser(data);
  }
}
