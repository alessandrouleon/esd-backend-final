import { IsString, Matches } from 'class-validator';
import { DepartmentMessageHelper } from 'src/utils/message.helps';

export class CreateDepartmentDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: DepartmentMessageHelper.EMPTY_CODE })
  code: string;

  @IsString()
  @Matches(/\S/, { message: DepartmentMessageHelper.EMPTY_DESCRIPTION })
  description: string;

  updatedAt?: Date;
  deletedAt?: Date;
}
