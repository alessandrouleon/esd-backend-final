import { Injectable } from '@nestjs/common';
import { OperatorRepositoryContract } from './operator.repository.contract';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { CreateOperatorDto } from '../dtos/create-operator.dto';
import { OperatorEntity } from '../entities/operator.entity';
import { DepartmentEntity } from 'src/modules/departments/entities/department.entity';
import { LineEntity } from 'src/modules/lines/entities/line.entity';
import { ShiftEntity } from 'src/modules/shifts/entities/shift.entity';
import { UpdateOperatorDto } from '../dtos/update-operator.dto';

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
}
