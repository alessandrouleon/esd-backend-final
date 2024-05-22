import { IsString, Matches } from 'class-validator';
import { EmployeeMessageHelper } from 'src/utils/message.helps';

export class CreateEmployeeDto {
  id?: string;
  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_NAME })
  name: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_REGISTRATION })
  registration: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_BOOT })
  boot: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_BRACELETE })
  bracelete: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_STATUS })
  status: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_SHIFT_ID })
  shiftId: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_DEPARTMENT_ID })
  departmentId: string;

  @IsString()
  @Matches(/\S/, { message: EmployeeMessageHelper.EMPTY_LINE_ID })
  lineId: string;

  imageId?: string;
  updatedAt?: Date;
  deletedAt?: Date;
}
