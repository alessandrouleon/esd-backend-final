import { Injectable } from '@nestjs/common';
import {
  IDepartmentReturnWithPagination,
  DepartmentRepositoryContract,
} from './department.repository.contract';
import { PaginatedData } from 'src/utils/pagination';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { DepartmentEntity } from '../entities/department.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';

@Injectable()
export class DepartmentRepository implements DepartmentRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createDepartment(
    data: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    return await this.repository.department.create({ data });
  }

  public async updateDepartment(
    id: string,
    data: UpdateDepartmentDto,
  ): Promise<DepartmentEntity> {
    return this.repository.department.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async deleteDepartment(
    id: string,
    data: UpdateDepartmentDto,
  ): Promise<void> {
    await this.repository.department.updateMany({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async findByDepartmentId(id: string): Promise<DepartmentEntity> {
    return await this.repository.department.findUnique({
      where: { id, deletedAt: null },
    });
  }

  public async findByCode(code: string): Promise<DepartmentEntity> {
    const findCode = await this.repository.department.findFirst({
      where: { code, deletedAt: null },
    });
    return findCode;
  }
  public async findByDecription(
    description: string,
  ): Promise<DepartmentEntity> {
    const findDescription = await this.repository.department.findFirst({
      where: { description, deletedAt: null },
    });
    return findDescription;
  }

  public async findAllDepartmentWithPagination({
    page,
    take,
  }: PaginatedData): Promise<IDepartmentReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.department.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null },
      }),
      this.repository.department.count({ where: { deletedAt: null } }),
    ]);
    return { departments: data, total };
  }

  public async findFilteredDepartmentWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<IDepartmentReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.department.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            {
              code: { contains: value },
            },
            {
              description: { contains: value },
            },
          ],
          deletedAt: null,
        },
      }),
    ]);
    const total = data.length;
    return { departments: data, total };
  }
}
