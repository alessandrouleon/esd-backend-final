import { TestEsdEntity } from '../entities/testEsd.entity';

export class PaginatedTestEsdDTO {
  testEsds: TestEsdEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
