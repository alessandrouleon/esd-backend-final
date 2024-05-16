import { Injectable } from '@nestjs/common';
import {
  ILineReturnWithPagination,
  LineRepositoryContract,
} from './line.repository.contract';
import { PaginatedData } from 'src/utils/pagination';
import { CreateLineDto } from '../dtos/create-line.dto';
import { LineEntity } from '../entities/line.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { UpdateLineDto } from '../dtos/update-line.dto';

@Injectable()
export class LineRepository implements LineRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createLine(data: CreateLineDto): Promise<LineEntity> {
    return await this.repository.line.create({ data });
  }

  public async updateLine(
    id: string,
    data: UpdateLineDto,
  ): Promise<LineEntity> {
    return this.repository.line.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async deleteLine(id: string, data: UpdateLineDto): Promise<void> {
    await this.repository.line.updateMany({
      where: { id, deletedAt: null },
      data,
    });
  }

  public async findByLineId(id: string): Promise<LineEntity> {
    return await this.repository.line.findUnique({
      where: { id, deletedAt: null },
    });
  }

  public async findByCode(code: string): Promise<LineEntity> {
    const findCode = await this.repository.line.findFirst({
      where: { code, deletedAt: null },
    });
    return findCode;
  }
  public async findByDecription(description: string): Promise<LineEntity> {
    const findDescription = await this.repository.line.findFirst({
      where: { description, deletedAt: null },
    });
    return findDescription;
  }

  public async findAllLineWithPagination({
    page,
    take,
  }: PaginatedData): Promise<ILineReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.line.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null },
      }),
      this.repository.line.count({ where: { deletedAt: null } }),
    ]);
    return { lines: data, total };
  }

  public async findFilteredLineWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<ILineReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.line.findMany({
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
    return { lines: data, total };
  }
}
