import { Inject, Injectable } from '@nestjs/common';
import { TestEsdRepositoryContract } from '../repositories/testeEsd.repository.contract';
import { FilterColumnTestEsd } from '../dtos/filter-column-testEsd.dto';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';

@Injectable()
export class FilterTestEsdUseCase {
  constructor(
    @Inject('TestEsdRepositoryContract')
    private testEsdRepository: TestEsdRepositoryContract,
  ) {}
  private async getValuesInTestEsds(
    department: string,
    shift: string,
    line: string,
    startDate: string,
    endDate: string,
  ) {
    const testEsds = await this.testEsdRepository.filteredTestEsdWithPagination(
      department,
      shift,
      line,
      startDate,
      endDate,
    );
    return testEsds;
  }

  public async getFilterTestEsds({
    shift,
    department,
    line,
    startDate,
    endDate,
  }: FilterColumnTestEsd): Promise<EmployeeEntity[]> {
    if (department || shift || line || startDate || endDate) {
      return this.getValuesInTestEsds(
        department,
        shift,
        line,
        startDate,
        endDate,
      );
    }
  }
}
