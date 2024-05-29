import { IsEnum, IsString, Matches } from 'class-validator';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';
import { TesteEsdMessageHelper } from 'src/utils/message.helps';

enum BootAndBracelete {
  OK = 'OK',
  NON = 'NOK',
  NA = 'N/A',
}

export class CreateTesteEsdDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: TesteEsdMessageHelper.EMPTY_BOOT })
  @IsEnum(BootAndBracelete, {
    message: 'O campo boot deve ser  OK, NOK ou N/A',
  })
  boot: BootAndBracelete;

  @IsString()
  @Matches(/\S/, { message: TesteEsdMessageHelper.EMPTY_BRACELETE })
  @IsEnum(BootAndBracelete, {
    message: 'O campo pulseira deve ser  OK, NOK ou N/A',
  })
  bracelete: BootAndBracelete;

  @IsString()
  @Matches(/\S/, { message: TesteEsdMessageHelper.EMPTY_EMPLOYEE_ID })
  employeeId: string;

  employee?: EmployeeEntity;

  updatedAt?: Date;
  deletedAt?: Date;
}
