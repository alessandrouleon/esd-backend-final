import { Inject, Injectable } from '@nestjs/common';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedTestEsdDTO } from '../dtos/paginated-testEsd.dto';
import { TestEsdEntity } from '../entities/testEsd.entity';
import { TestEsdRepositoryContract } from '../repositories/testeEsd.repository.contract';

@Injectable()
export class GetTestEsdUseCase {
  constructor(
    @Inject('TestEsdRepositoryContract')
    private testEsdRepository: TestEsdRepositoryContract,
  ) {}
  private async getValuesInTestEsds(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { testEsds, total } =
      await this.testEsdRepository.findFilteredTestEsdWithPagination(value, {
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { testEsds, ...goal };
  }

  private async getAllTestEsdPaginated({ skip, take, page }: PaginatedData) {
    const { testEsds, total } =
      await this.testEsdRepository.findAllTestsEsdWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });

    return { testEsds, ...goal };
  }

  public async getTestEsds(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedTestEsdDTO | TestEsdEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllTestEsdPaginated({ page, skip, take });
    if (value) return this.getValuesInTestEsds(value, { page, skip, take });
  }

  public async getAllTestEsdNotPagination() {
    const testEsd = await this.testEsdRepository.findAllTesttEsdNotPagination();
    return { testEsd };
  }
}
