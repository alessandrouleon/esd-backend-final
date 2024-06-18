import { Inject, Injectable } from '@nestjs/common';
import { LineRepositoryContract } from '../repositories/line.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedLineDTO } from '../dtos/paginated-line.dto';
import { LineEntity } from '../entities/line.entity';

@Injectable()
export class GetLineUseCase {
  constructor(
    @Inject('LineRepositoryContract')
    private lineRepository: LineRepositoryContract,
  ) {}
  private async getValuesInLines(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { lines, total } =
      await this.lineRepository.findFilteredLineWithPagination(value, {
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { lines, ...goal };
  }

  private async getAllLinePaginated({ skip, take, page }: PaginatedData) {
    const { lines, total } =
      await this.lineRepository.findAllLineWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { lines, ...goal };
  }

  public async getLines(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedLineDTO | LineEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllLinePaginated({ page, skip, take });
    if (value) return this.getValuesInLines(value, { page, skip, take });
  }

  public async getAllLinesNotPagination() {
    return await this.lineRepository.findAllLinesNotPagination();
  }
}
