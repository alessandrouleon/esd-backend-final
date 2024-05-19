import {
  Body,
  Controller,
  Post,
  //   Delete,
  //   Get,
  //   Param,
  //   Patch,
  //   Query,
} from '@nestjs/common';
import { CreateOperatorUseCase } from '../useCases/create-operator.useCase';
import { CreateOperatorDto } from '../dtos/create-operator.dto';
//   import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';
//   import { UpdateShiftDto } from '../dtos/update-shift.dto';
//   import { DeleteShiftUseCase } from '../useCases/delete-shift.useCase';
//   import { SearchValueInColumn } from 'src/utils/pagination';
//   import { GetShiftUseCase } from '../useCases/get-shift.useCase';

@Controller('operators')
export class OperatorController {
  constructor(
    private readonly createOperatorUseCase: CreateOperatorUseCase,
    //   private readonly updateShiftUseCase: UpdateShiftUseCase,
    //   private readonly deleteShiftUseCase: DeleteShiftUseCase,
    //   private readonly getShiftUseCase: GetShiftUseCase,
  ) {}

  @Post()
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.createOperatorUseCase.execute(createOperatorDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
  //   return this.updateShiftUseCase.update(id, updateShiftDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.deleteShiftUseCase.delete(id);
  // }

  // @Get('/search/:page')
  // async findSearch(
  //   @Param('page') page: number,
  //   @Query() search: SearchValueInColumn,
  // ) {
  //   return this.getShiftUseCase.getShifts(search, page);
  // }
}
