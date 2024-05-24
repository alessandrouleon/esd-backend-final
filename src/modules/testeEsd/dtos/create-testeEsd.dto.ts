import { IsString, Matches } from 'class-validator';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';
import { TesteEsdMessageHelper } from 'src/utils/message.helps';

export class CreateTesteEsdDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: TesteEsdMessageHelper.EMPTY_BOOT })
  boot: string;

  @IsString()
  @Matches(/\S/, { message: TesteEsdMessageHelper.EMPTY_BRACELETE })
  bracelete: string;

  @IsString()
  @Matches(/\S/, { message: TesteEsdMessageHelper.EMPTY_EMPLOYEE_ID })
  employeeId: string;

  employee?: EmployeeEntity;

  updatedAt?: Date;
  deletedAt?: Date;
}
