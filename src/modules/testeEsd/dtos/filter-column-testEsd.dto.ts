import { IsString, Matches } from 'class-validator';
import { FilterColumnTestEsdMessage } from 'src/utils/message.helps';

export class FilterColumnTestEsd {
  shift?: string;
  department?: string;
  line?: string;

  @IsString()
  @Matches(/\S/, { message: FilterColumnTestEsdMessage.EMPT_START_DATE })
  startDate: string;

  @IsString()
  @Matches(/\S/, { message: FilterColumnTestEsdMessage.EMPT_AND_DATE })
  endDate: string;
}
