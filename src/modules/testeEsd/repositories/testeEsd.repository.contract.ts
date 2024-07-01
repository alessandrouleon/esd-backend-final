// import { PaginatedData } from 'src/utils/pagination';
import { TestEsdEntity } from '../entities/testEsd.entity';
import { CreateTestEsdDto } from '../dtos/create-testEsd.dto';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';
import { PaginatedData } from 'src/utils/pagination';

export interface ITestEsdReturnWithPagination {
  testEsds: TestEsdEntity[];
  total: number;
}

export interface TestEsdRepositoryContract {
  createTestEsd(data: CreateTestEsdDto): Promise<TestEsdEntity>;
  findByRegistration(registration: string): Promise<EmployeeEntity | null>;
  findByBoot(boot: string): Promise<EmployeeEntity | null>;
  findByBracelete(bracelete: string): Promise<EmployeeEntity | null>;
  findFilteredTestEsdWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<ITestEsdReturnWithPagination>;
  findAllTestsEsdWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<ITestEsdReturnWithPagination>;
  findAllTesttEsdNotPagination(): Promise<TestEsdEntity[] | null>;
  filteredTestEsdWithPagination(
    department: string,
    shift: string,
    line: string,
    startDate: string,
    endDate: string,
  ): Promise<EmployeeEntity[] | null>;
}
