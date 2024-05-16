import { IsString, Matches } from 'class-validator';
import { LineMessageHelper } from 'src/utils/message.helps';

export class CreateLineDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: LineMessageHelper.EMPTY_CODE })
  code: string;

  @IsString()
  @Matches(/\S/, { message: LineMessageHelper.EMPTY_DESCRIPTION })
  description: string;

  updatedAt?: Date;
  deletedAt?: Date;
}
