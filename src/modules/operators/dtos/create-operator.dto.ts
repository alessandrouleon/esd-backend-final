import { IsString, Matches } from 'class-validator';
import { OperatorMessageHelper } from 'src/utils/message.helps';

export class CreateOperatorDto {
  id?: string;
  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_NAME })
  name: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_REGISTRATION })
  registration: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_BOOT })
  boot: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_BRACELETE })
  bracelete: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_STATUS })
  status: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_SHIFT_ID })
  shiftId: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_DEPARTMENT_ID })
  departmentId: string;

  @IsString()
  @Matches(/\S/, { message: OperatorMessageHelper.EMPTY_LINE_ID })
  lineId: string;

  updatedAt?: Date;
  deletedAt?: Date;
}
