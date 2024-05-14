import { ShiftEntity } from '../entities/shift.entity';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { UpdateShiftDto } from '../dtos/update-shift.dto';
// import { PaginatedData } from 'src/utils/pagination';

export interface IShiftReturnWithPagination {
  shifts: ShiftEntity[];
  total: number;
}

export interface ShiftRepositoryContract {
  createShift(data: CreateShiftDto): Promise<ShiftEntity>;
  updateShift(id: string, data: UpdateShiftDto): Promise<ShiftEntity>;
  findByCode(code: string): Promise<ShiftEntity>;
  findByDecription(description: string): Promise<ShiftEntity>;
  findByShiftId(id: string): Promise<ShiftEntity>;
  deleteShift(id: string, data: UpdateShiftDto): Promise<void>;
  // findFilteredShiftWithPagination(
  //   value: string,
  //   parametersToPaginate: PaginatedData,
  // ): Promise<IShiftReturnWithPagination>;
  // findAllShiftsWithPagination(
  //   parametersToPaginate: PaginatedData,
  // ): Promise<IShiftReturnWithPagination>;
}
