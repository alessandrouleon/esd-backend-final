import { Injectable } from '@nestjs/common';
import {
  IOperatorReturnWithPagination,
  OperatorRepositoryContract,
} from './operator.repository.contract';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { CreateOperatorDto } from '../dtos/create-operator.dto';
import { OperatorEntity } from '../entities/operator.entity';
import { DepartmentEntity } from 'src/modules/departments/entities/department.entity';
import { LineEntity } from 'src/modules/lines/entities/line.entity';
import { ShiftEntity } from 'src/modules/shifts/entities/shift.entity';
import { UpdateOperatorDto } from '../dtos/update-operator.dto';
import { PaginatedData } from 'src/utils/pagination';

@Injectable()
export class OperatorRepository implements OperatorRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createOperator(
    data: CreateOperatorDto,
  ): Promise<OperatorEntity> {
    return await this.repository.operator.create({ data });
  }

  public async updateOperator(
    id: string,
    data: UpdateOperatorDto,
  ): Promise<OperatorEntity> {
    return await this.repository.operator.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async deleteOperator(
    id: string,
    data: UpdateOperatorDto,
  ): Promise<OperatorEntity> {
    return await this.repository.operator.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async findByOperatorId(id: string): Promise<OperatorEntity> {
    return await this.repository.operator.findFirst({
      where: { id, deletedAt: null },
    });
  }

  public async findByName(name: string): Promise<OperatorEntity | null> {
    return await this.repository.operator.findFirst({
      where: { name, deletedAt: null },
    });
  }

  public async findByRegistration(
    registration: string,
  ): Promise<OperatorEntity | null> {
    return await this.repository.operator.findFirst({
      where: { registration, deletedAt: null },
    });
  }

  public async findShiftById(id: string): Promise<ShiftEntity | null> {
    return this.repository.shift.findUnique({
      where: { id, deletedAt: null },
    });
  }

  public async findDepartmentById(
    id: string,
  ): Promise<DepartmentEntity | null> {
    return this.repository.department.findUnique({
      where: { id, deletedAt: null },
    });
  }

  public async findLineById(id: string): Promise<LineEntity | null> {
    return this.repository.line.findUnique({
      where: { id, deletedAt: null },
    });
  }

  public async findFilteredOperatorsWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<IOperatorReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.operator.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            {
              name: { contains: value },
            },
            {
              registration: { contains: value },
            },
            {
              boot: { contains: value },
            },
            {
              bracelete: { contains: value },
            },
            {
              status: { contains: value },
            },
            {
              Shift: { code: { contains: value } },
            },
            {
              Shift: { description: { contains: value } },
            },
            {
              Department: { code: { contains: value } },
            },
            {
              Department: { description: { contains: value } },
            },
            {
              Line: { code: { contains: value } },
            },
            {
              Line: { description: { contains: value } },
            },
          ],
          deletedAt: null,
        },
        include: {
          Shift: true,
          Department: true,
          Line: true,
        },
      }),
    ]);
    const total = data.length;
    return { operators: data, total };
  }

  public async findAllOperatorsWithPagination({
    page,
    take,
  }: PaginatedData): Promise<IOperatorReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.operator.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null },
        include: {
          Shift: true,
          Department: true,
          Line: true,
        },
      }),
      this.repository.operator.count({ where: { deletedAt: null } }),
    ]);
    return { operators: data, total };
  }
}
