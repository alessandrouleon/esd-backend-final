import { LineEntity } from '../entities/line.entity';

export class PaginatedLineDTO {
  lines: LineEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
