import { Injectable } from '@nestjs/common';
import {
  IShiftReturnWithPagination,
  ShiftRepositoryContract,
} from './shift.repository.contract';
import { PaginatedData } from 'src/utils/pagination';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { ShiftEntity } from '../entities/shift.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { UpdateShiftDto } from '../dtos/update-shift.dto';

@Injectable()
export class ShiftRepository implements ShiftRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createShift(data: CreateShiftDto): Promise<ShiftEntity> {
    return await this.repository.shift.create({ data });
  }

  public async updateShift(
    id: string,
    data: UpdateShiftDto,
  ): Promise<ShiftEntity> {
    return this.repository.shift.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async deleteShift(id: string, data: UpdateShiftDto): Promise<void> {
    await this.repository.shift.updateMany({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async findByShiftId(id: string): Promise<ShiftEntity> {
    return await this.repository.shift.findUnique({
      where: { id, deletedAt: null },
    });
  }

  public async findByCode(code: string): Promise<ShiftEntity> {
    const findCode = await this.repository.shift.findFirst({
      where: { code, deletedAt: null },
    });
    return findCode;
  }
  public async findByDecription(description: string): Promise<ShiftEntity> {
    const findDescription = await this.repository.shift.findFirst({
      where: { description, deletedAt: null },
    });
    return findDescription;
  }

  public async findAllShiftsWithPagination({
    page,
    take,
  }: PaginatedData): Promise<IShiftReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.shift.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null },
      }),
      this.repository.shift.count({ where: { deletedAt: null } }),
    ]);
    return { shifts: data, total };
  }

  public async findFilteredShiftWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<IShiftReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.shift.findMany({
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
    return { shifts: data, total };
  }

  public async findAllShiftsNotPagination(): Promise<ShiftEntity[] | null> {
    const shifts = await this.repository.shift.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { deletedAt: null },
    });
    return shifts;
  }
}
