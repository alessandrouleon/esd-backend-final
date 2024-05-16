import { DepartmentEntity } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';
import { PaginatedData } from 'src/utils/pagination';

export interface IDepartmentReturnWithPagination {
  departments: DepartmentEntity[];
  total: number;
}

export interface DepartmentRepositoryContract {
  createDepartment(data: CreateDepartmentDto): Promise<DepartmentEntity>;
  updateDepartment(
    id: string,
    data: UpdateDepartmentDto,
  ): Promise<DepartmentEntity>;
  findByCode(code: string): Promise<DepartmentEntity>;
  findByDecription(description: string): Promise<DepartmentEntity>;
  findByDepartmentId(id: string): Promise<DepartmentEntity>;
  deleteDepartment(id: string, data: UpdateDepartmentDto): Promise<void>;
  findFilteredDepartmentWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<IDepartmentReturnWithPagination>;
  findAllDepartmentWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<IDepartmentReturnWithPagination>;
}
