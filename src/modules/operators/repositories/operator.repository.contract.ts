import { OperatorEntity } from '../entities/operator.entity';
import { CreateOperatorDto } from '../dtos/create-operator.dto';
import { LineEntity } from 'src/modules/lines/entities/line.entity';
import { ShiftEntity } from 'src/modules/shifts/entities/shift.entity';
import { DepartmentEntity } from 'src/modules/departments/entities/department.entity';
import { UpdateOperatorDto } from '../dtos/update-operator.dto';
import { PaginatedData } from 'src/utils/pagination';

export interface IOperatorReturnWithPagination {
  operators: OperatorEntity[];
  total: number;
}

export interface OperatorRepositoryContract {
  createOperator(data: CreateOperatorDto): Promise<OperatorEntity>;
  findByName(name: string): Promise<OperatorEntity | null>;
  findByRegistration(registration: string): Promise<OperatorEntity | null>;
  findByOperatorId(id: string): Promise<OperatorEntity | null>;
  findShiftById(id: string): Promise<ShiftEntity | null>;
  findDepartmentById(id: string): Promise<DepartmentEntity | null>;
  findLineById(id: string): Promise<LineEntity | null>;
  updateOperator(id: string, data: UpdateOperatorDto): Promise<OperatorEntity>;
  deleteOperator(id: string, data: UpdateOperatorDto): Promise<OperatorEntity>;
  findFilteredOperatorsWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<IOperatorReturnWithPagination | null>;
  findAllOperatorsWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<IOperatorReturnWithPagination | null>;
}
