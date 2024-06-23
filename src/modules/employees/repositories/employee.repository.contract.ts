import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { LineEntity } from 'src/modules/lines/entities/line.entity';
import { ShiftEntity } from 'src/modules/shifts/entities/shift.entity';
import { DepartmentEntity } from 'src/modules/departments/entities/department.entity';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { PaginatedData } from 'src/utils/pagination';

export interface IEmployeeReturnWithPagination {
  employees: EmployeeEntity[];
  total: number;
}

export interface EmployeeRepositoryContract {
  createEmployee(data: CreateEmployeeDto): Promise<EmployeeEntity>;
  findByName(name: string): Promise<EmployeeEntity | null>;
  findByRegistration(registration: string): Promise<EmployeeEntity | null>;
  findByEmployeeId(id: string): Promise<EmployeeEntity | null>;
  findShiftById(id: string): Promise<ShiftEntity | null>;
  findDepartmentById(id: string): Promise<DepartmentEntity | null>;
  findLineById(id: string): Promise<LineEntity | null>;
  updateEmployee(id: string, data: UpdateEmployeeDto): Promise<EmployeeEntity>;
  deleteEmployee(id: string, data: UpdateEmployeeDto): Promise<EmployeeEntity>;
  findFilteredEmployeesWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<IEmployeeReturnWithPagination | null>;
  findAllEmployeesWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<IEmployeeReturnWithPagination | null>;
  findAllEmployeesNotPagination(): Promise<EmployeeEntity[] | null>;
}
