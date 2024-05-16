import { DepartmentEntity } from '../entities/department.entity';

export class PaginatedDepartmentDTO {
  departments: DepartmentEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
