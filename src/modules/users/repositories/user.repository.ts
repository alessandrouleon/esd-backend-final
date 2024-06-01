import { Injectable } from '@nestjs/common';
import {
  IUserReturnWithPagination,
  UserRepositoryContract,
} from './user.repository.contract';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';
import { PaginatedData } from 'src/utils/pagination';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createUser(data: CreateUserDto): Promise<UserEntity> {
    return await this.repository.user.create({ data });
  }

  public async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.repository.user.update({
      where: { id, deletedAt: null },
      data,
    });
  }
  public async deleteUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.repository.user.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async findByUserName(username: string): Promise<UserEntity> {
    return await this.repository.user.findFirst({
      where: { username, deletedAt: null },
    });
  }
  public async findByPassword(password: string): Promise<UserEntity> {
    return this.repository.user.findFirst({
      where: { password, deletedAt: null },
    });
  }
  public async findByUserId(id: string): Promise<UserEntity> {
    return await this.repository.user.findFirst({
      where: { id, deletedAt: null },
    });
  }
  public async findByEmployeeId(id: string): Promise<EmployeeEntity> {
    return await this.repository.employee.findFirst({
      where: { id, deletedAt: null },
    });
  }

  public async findFilteredUsersWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<IUserReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.user.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            { username: { contains: value } },
            { status: { contains: value } },
            { roles: { contains: value } },
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
        include: {
          Employee: true,
        },
      }),
    ]);
    const total = data.length;
    return { users: data, total };
  }

  public async findAllUsersWithPagination({
    page,
    take,
  }: PaginatedData): Promise<IUserReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.user.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null },
        include: {
          Employee: true,
        },
      }),
      this.repository.user.count({ where: { deletedAt: null } }),
    ]);
    return { users: data, total };
  }
}
