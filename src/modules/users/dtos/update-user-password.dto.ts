import { IsString, Matches } from 'class-validator';
import { UserMessageHelper } from 'src/utils/message.helps';

export class UpdateUserPasswordDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: UserMessageHelper.EMPTY_PASSWORD_UPDATE })
  password: string;
}
