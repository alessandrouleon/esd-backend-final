import { IsString, Matches } from 'class-validator';
import { ShiftMessageHelper } from 'src/utils/message.helps';

export class CreateShiftDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: ShiftMessageHelper.EMPTY_CODE })
  code: string;

  @IsString()
  @Matches(/\S/, { message: ShiftMessageHelper.EMPTY_DESCRIPTION })
  description: string;

  updatedAt?: Date;
  deletedAt?: Date;
}
