import { LineEntity } from '../entities/line.entity';
import { CreateLineDto } from '../dtos/create-line.dto';
import { UpdateLineDto } from '../dtos/update-line.dto';
import { PaginatedData } from 'src/utils/pagination';

export interface ILineReturnWithPagination {
  lines: LineEntity[];
  total: number;
}

export interface LineRepositoryContract {
  createLine(data: CreateLineDto): Promise<LineEntity>;
  updateLine(id: string, data: UpdateLineDto): Promise<LineEntity>;
  findByCode(code: string): Promise<LineEntity>;
  findByDecription(description: string): Promise<LineEntity>;
  findByLineId(id: string): Promise<LineEntity>;
  deleteLine(id: string, data: UpdateLineDto): Promise<void>;
  findFilteredLineWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<ILineReturnWithPagination>;
  findAllLineWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<ILineReturnWithPagination>;
}
