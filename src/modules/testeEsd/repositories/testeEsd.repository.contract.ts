// import { PaginatedData } from 'src/utils/pagination';
import { TesteEsdEntity } from '../entities/testeEsd.entity';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';

export interface ITesteEsdReturnWithPagination {
  testeEsds: TesteEsdEntity[];
  total: number;
}

export interface TesteEsdRepositoryContract {
  createTesteEsd(data: CreateTesteEsdDto): Promise<TesteEsdEntity>;
  findByRegistration(registration: string): Promise<EmployeeEntity | null>;
  findByBoot(boot: string): Promise<EmployeeEntity | null>;
  findByBracelete(bracelete: string): Promise<EmployeeEntity | null>;
  //   findFilteredTesteEsdWithPagination(
  //     value: string,
  //     parametersToPaginate: PaginatedData,
  //   ): Promise<ITesteEsdReturnWithPagination>;
  //   findAllTestesEsdWithPagination(
  //     parametersToPaginate: PaginatedData,
  //   ): Promise<ITesteEsdReturnWithPagination>;
}
