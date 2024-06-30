import { Inject, Injectable } from '@nestjs/common';
import {
  FilterColumnTestEsd,
  PaginatedData,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedTestEsdDTO } from '../dtos/paginated-testEsd.dto';
import { TestEsdEntity } from '../entities/testEsd.entity';
import { TestEsdRepositoryContract } from '../repositories/testeEsd.repository.contract';

@Injectable()
export class FilterTestEsdUseCase {
  constructor(
    @Inject('TestEsdRepositoryContract')
    private testEsdRepository: TestEsdRepositoryContract,
  ) {}
  private async getValuesInTestEsds(
    department: string,
    shift: string,
    line: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { testEsds, total } =
      await this.testEsdRepository.filteredTestEsdWithPagination(
        department,
        shift,
        line,
        {
          skip,
          take,
          page,
        },
      );
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

  public async getFilterTestEsds(
    { shift, department, line }: FilterColumnTestEsd,
    pageNumber: number,
  ): Promise<PaginatedTestEsdDTO | TestEsdEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!department && !shift && !line) {
      return this.getAllTestEsdPaginated({ page, skip, take });
    }

    if (department || shift || line) {
      return this.getValuesInTestEsds(department, shift, line, {
        page,
        skip,
        take,
      });
    }
  }
}
