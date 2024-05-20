import {
  Body,
  Controller,
  Post,
  Delete,
  //   Get,
  Param,
  Patch,
  //   Query,
} from '@nestjs/common';
import { CreateOperatorUseCase } from '../useCases/create-operator.useCase';
import { CreateOperatorDto } from '../dtos/create-operator.dto';
import { UpdateOperatorUseCase } from '../useCases/update-operator.useCase';
import { UpdateOperatorDto } from '../dtos/update-operator.dto';
import { DeleteOperatorUseCase } from '../useCases/delete-operator.useCase';
//   import { SearchValueInColumn } from 'src/utils/pagination';
//   import { GetShiftUseCase } from '../useCases/get-shift.useCase';

@Controller('operators')
export class OperatorController {
  constructor(
    private readonly createOperatorUseCase: CreateOperatorUseCase,
    private readonly updateOperatorUseCase: UpdateOperatorUseCase,
    private readonly deleteOperatorUseCase: DeleteOperatorUseCase,
    //   private readonly getShiftUseCase: GetShiftUseCase,
  ) {}

  @Post()
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.createOperatorUseCase.execute(createOperatorDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return this.updateOperatorUseCase.update(id, updateOperatorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteOperatorUseCase.delete(id);
  }

  // @Get('/search/:page')
  // async findSearch(
  //   @Param('page') page: number,
  //   @Query() search: SearchValueInColumn,
  // ) {
  //   return this.getShiftUseCase.getShifts(search, page);
  // }
}
