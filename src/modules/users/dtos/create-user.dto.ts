import { IsString, Matches } from 'class-validator';
import { UserMessageHelper } from 'src/utils/message.helps';

export class CreateUserDto {
  id?: string;
  @IsString()
  @Matches(/\S/, { message: UserMessageHelper.EMPTY_USERNAME })
  username: string;

  @IsString()
  @Matches(/\S/, { message: UserMessageHelper.EMPTY_PASSWORD })
  password: string;

  @IsString()
  @Matches(/\S/, { message: UserMessageHelper.EMPTY_STATUS })
  status: string;

  @IsString()
  @Matches(/\S/, { message: UserMessageHelper.EMPTY_ROLES })
  roles: string;

  @IsString()
  @Matches(/\S/, { message: UserMessageHelper.EMPTY_EMPLOYEE_ID })
  employeeId: string;

  updatedAt?: Date;
  deletedAt?: Date;
}
