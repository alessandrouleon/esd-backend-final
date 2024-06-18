import { Inject, Injectable } from '@nestjs/common';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedDepartmentDTO } from '../dtos/paginated-department.dto';
import { DepartmentEntity } from '../entities/department.entity';

@Injectable()
export class GetDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
  ) {}
  private async getValuesInDepartment(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { departments, total } =
      await this.departmentRepository.findFilteredDepartmentWithPagination(
        value,
        {
          skip,
          take,
          page,
        },
      );
    const goal = paginateResponse({ total, page, take });
    return { departments, ...goal };
  }

  private async getAllDepartmentPaginated({ skip, take, page }: PaginatedData) {
    const { departments, total } =
      await this.departmentRepository.findAllDepartmentWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { departments, ...goal };
  }

  public async getAllDepartments(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedDepartmentDTO | DepartmentEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllDepartmentPaginated({ page, skip, take });
    if (value) return this.getValuesInDepartment(value, { page, skip, take });
  }

  public async getAllDepartmentsNotPagination() {
    return await this.departmentRepository.findAllDepartmentsNotPagination();
  }
}
