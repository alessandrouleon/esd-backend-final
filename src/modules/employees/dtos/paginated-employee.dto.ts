import { EmployeeEntity } from '../entities/employee.entity';

export class PaginatedEmployeeDTO {
  employees: EmployeeEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
