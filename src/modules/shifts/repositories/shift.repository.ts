import { Injectable } from '@nestjs/common';
import {
  // IShiftReturnWithPagination,
  ShiftRepositoryContract,
} from './shift.repository.contract';
// import { PaginatedData } from 'src/utils/pagination';
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
      where: { id },
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
      where: { code },
    });
    return findCode;
  }
  public async findByDecription(description: string): Promise<ShiftEntity> {
    const findDescription = await this.repository.shift.findFirst({
      where: { description },
    });
    return findDescription;
  }

  // findFilteredShiftWithPagination(
  //   value: string,
  //   parametersToPaginate: PaginatedData,
  // ): Promise<IShiftReturnWithPagination> {
  //   throw new Error('Method not implemented.');
  // }

  // findAllShiftsWithPagination(
  //   parametersToPaginate: PaginatedData,
  // ): Promise<IShiftReturnWithPagination> {
  //   throw new Error('Method not implemented.');
  // }
}
