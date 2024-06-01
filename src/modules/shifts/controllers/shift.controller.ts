import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateShiftUseCase } from '../useCases/create-shift.useCase';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';
import { UpdateShiftDto } from '../dtos/update-shift.dto';
import { DeleteShiftUseCase } from '../useCases/delete-shift.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetShiftUseCase } from '../useCases/get-shift.useCase';
import { Public } from 'src/modules/auth/public';

@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly createShiftUseCase: CreateShiftUseCase,
    private readonly updateShiftUseCase: UpdateShiftUseCase,
    private readonly deleteShiftUseCase: DeleteShiftUseCase,
    private readonly getShiftUseCase: GetShiftUseCase,
  ) {}

  @Post()
  @Public()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.createShiftUseCase.execute(createShiftDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.updateShiftUseCase.update(id, updateShiftDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteShiftUseCase.delete(id);
  }

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getShiftUseCase.getShifts(search, page);
  }
}
