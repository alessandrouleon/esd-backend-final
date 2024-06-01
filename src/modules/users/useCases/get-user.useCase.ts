import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedUserDTO } from '../dtos/paginated-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
    private userRepository: UserRepositoryContract,
  ) {}
  private async getValuesInUsers(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { users, total } =
      await this.userRepository.findFilteredUsersWithPagination(value, {
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { users, ...goal };
  }

  private async getAllUsersPaginated({ skip, take, page }: PaginatedData) {
    const { users, total } =
      await this.userRepository.findAllUsersWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });

    return { users, ...goal };
  }

  public async getUsers(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedUserDTO | UserEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllUsersPaginated({ page, skip, take });
    if (value) return this.getValuesInUsers(value, { page, skip, take });
  }
}
