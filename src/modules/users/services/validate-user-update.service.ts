import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class ValidateUserUpdateService {
  async validateUsernameOnUpdate(
    newUsername: string,
    oldUsername: string,
  ): Promise<void> {
    if (newUsername !== oldUsername) {
      throw new HttpException(
        UserMessageHelper.EXIST_USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateEmployeeIdOnUpdate(
    newEmployeeId: string,
    oldEmployeeId: string,
  ): Promise<void> {
    if (newEmployeeId !== oldEmployeeId) {
      throw new HttpException(
        UserMessageHelper.ID_EMPLOYEE_DIFERENT,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
