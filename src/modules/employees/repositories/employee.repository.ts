import { Injectable } from '@nestjs/common';
import {
  IEmployeeReturnWithPagination,
  EmployeeRepositoryContract,
} from './employee.repository.contract';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { DepartmentEntity } from 'src/modules/departments/entities/department.entity';
import { LineEntity } from 'src/modules/lines/entities/line.entity';
import { ShiftEntity } from 'src/modules/shifts/entities/shift.entity';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { PaginatedData } from 'src/utils/pagination';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createEmployee(
    data: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this.repository.employee.create({ data });
  }

  public async updateEmployee(
    id: string,
    data: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this.repository.employee.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async deleteEmployee(
    id: string,
    data: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this.repository.employee.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async findByEmployeeId(id: string): Promise<EmployeeEntity> {
    return await this.repository.employee.findFirst({
      where: { id, deletedAt: null },
    });
  }

  public async findByName(name: string): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { name, deletedAt: null },
    });
  }

  public async findByRegistration(
    registration: string,
  ): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
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

  public async findFilteredEmployeesWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<IEmployeeReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.employee.findMany({
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
    return { employees: data, total };
  }

  public async findAllEmployeesWithPagination({
    page,
    take,
  }: PaginatedData): Promise<IEmployeeReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.employee.findMany({
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
      this.repository.employee.count({ where: { deletedAt: null } }),
    ]);
    return { employees: data, total };
  }
}
