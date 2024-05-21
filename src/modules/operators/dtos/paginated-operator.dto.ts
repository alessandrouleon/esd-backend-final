import { OperatorEntity } from '../entities/operator.entity';

export class PaginatedOperatorDTO {
  operators: OperatorEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
