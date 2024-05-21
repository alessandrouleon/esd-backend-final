import { Inject, Injectable } from '@nestjs/common';
import { OperatorRepositoryContract } from '../repositories/operator.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedOperatorDTO } from '../dtos/paginated-operator.dto';
import { OperatorEntity } from '../entities/operator.entity';

@Injectable()
export class GetOperatorUseCase {
  constructor(
    @Inject('OperatorRepositoryContract')
    private operatorRepository: OperatorRepositoryContract,
  ) {}
  private async getValuesInOperators(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { operators, total } =
      await this.operatorRepository.findFilteredOperatorsWithPagination(value, {
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { operators, ...goal };
  }

  private async getAllOperatorsPaginated({ skip, take, page }: PaginatedData) {
    const { operators, total } =
      await this.operatorRepository.findAllOperatorsWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { operators, ...goal };
  }

  public async getOperators(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedOperatorDTO | OperatorEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllOperatorsPaginated({ page, skip, take });
    if (value) return this.getValuesInOperators(value, { page, skip, take });
  }
}
