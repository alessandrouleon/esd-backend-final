import { Inject, Injectable } from '@nestjs/common';
import { ShiftRepositoryContract } from '../repositories/shift.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedShiftDTO } from '../dtos/paginated-shift.dto';
import { ShiftEntity } from '../entities/shift.entity';

@Injectable()
export class GetShiftUseCase {
  constructor(
    @Inject('ShiftRepositoryContract')
    private repositoryShift: ShiftRepositoryContract,
  ) {}
  private async getValuesInShifts(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { shifts, total } =
      await this.repositoryShift.findFilteredShiftWithPagination(value, {
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { shifts, ...goal };
  }

  private async getAllShiftPaginated({ skip, take, page }: PaginatedData) {
    const { shifts, total } =
      await this.repositoryShift.findAllShiftsWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { shifts, ...goal };
  }

  public async getShifts(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedShiftDTO | ShiftEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllShiftPaginated({ page, skip, take });
    if (value) return this.getValuesInShifts(value, { page, skip, take });
  }

  public async getAllShiftsNotPagination() {
    return await this.repositoryShift.findAllShiftsNotPagination();
  }
}
