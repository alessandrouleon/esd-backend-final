import { TesteEsdEntity } from '../entities/testeEsd.entity';

export class PaginatedTesteEsdDTO {
  testeEsds: TesteEsdEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
