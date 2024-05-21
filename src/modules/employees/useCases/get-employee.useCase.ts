import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedEmployeeDTO } from '../dtos/paginated-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class GetEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}
  private async getValuesInEmployees(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { employees, total } =
      await this.employeeRepository.findFilteredEmployeesWithPagination(value, {
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { employees, ...goal };
  }

  private async getAllEmployeesPaginated({ skip, take, page }: PaginatedData) {
    const { employees, total } =
      await this.employeeRepository.findAllEmployeesWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { employees, ...goal };
  }

  public async getEmployees(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedEmployeeDTO | EmployeeEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllEmployeesPaginated({ page, skip, take });
    if (value) return this.getValuesInEmployees(value, { page, skip, take });
  }
}
