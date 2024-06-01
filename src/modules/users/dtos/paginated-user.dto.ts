import { UserEntity } from '../entities/user.entity';

export class PaginatedUserDTO {
  users: UserEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
