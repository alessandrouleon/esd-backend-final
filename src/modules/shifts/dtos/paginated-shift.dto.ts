import { ShiftEntity } from '../entities/shift.entity';

export class PaginatedShiftDTO {
  shifts: ShiftEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
