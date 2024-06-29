import { Injectable } from '@nestjs/common';
import {
  ITestEsdReturnWithPagination,
  TestEsdRepositoryContract,
} from './testeEsd.repository.contract';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';

import { TestEsdEntity } from '../entities/testEsd.entity';
import { PaginatedData } from 'src/utils/pagination';
import { CreateTestEsdDto } from '../dtos/create-testEsd.dto';

@Injectable()
export class TestEsdRepository implements TestEsdRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createTestEsd(data: CreateTestEsdDto): Promise<TestEsdEntity> {
    return await this.repository.testeEsd.create({ data });
  }

  public async findByRegistration(
    registration: string,
  ): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { registration, deletedAt: null },
    });
  }

  public async findByBoot(boot: string): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { boot, deletedAt: null },
    });
  }

  public async findByBracelete(
    bracelete: string,
  ): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { bracelete, deletedAt: null },
    });
  }

  public async findFilteredTestEsdWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<ITestEsdReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.testeEsd.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            { boot: { contains: value } },
            { bracelete: { contains: value } },
            {
              Employee: { name: { contains: value } },
            },
            {
              Employee: { registration: { contains: value } },
            },
            {
              Employee: { occupation: { contains: value } },
            },
          ],
          deletedAt: null,
        },
        select: {
          id: true,
          boot: true,
          bracelete: true,
          employeeId: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          Employee: {
            select: {
              id: true,
              name: true,
              registration: true,
              boot: true,
              bracelete: true,
              status: true,
              occupation: true,
              imageId: true,
              shiftId: true,
              Shift: {
                select: {
                  id: true,
                  code: true,
                  description: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              departmentId: true,
              Department: {
                select: {
                  id: true,
                  code: true,
                  description: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              lineId: true,
              Line: {
                select: {
                  id: true,
                  code: true,
                  description: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      }),
    ]);
    const total = data.length;
    return { testEsds: data, total };
  }

  public async findAllTestsEsdWithPagination({
    take,
    page,
  }: PaginatedData): Promise<ITestEsdReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.testeEsd.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null },
        select: {
          id: true,
          boot: true,
          bracelete: true,
          employeeId: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          Employee: {
            select: {
              id: true,
              name: true,
              registration: true,
              boot: true,
              bracelete: true,
              status: true,
              occupation: true,
              imageId: true,
              shiftId: true,
              Shift: {
                select: {
                  id: true,
                  code: true,
                  description: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              departmentId: true,
              Department: {
                select: {
                  id: true,
                  code: true,
                  description: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              lineId: true,
              Line: {
                select: {
                  id: true,
                  code: true,
                  description: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      }),
      this.repository.user.count({ where: { deletedAt: null } }),
    ]);
    return { testEsds: data, total };
  }
}
