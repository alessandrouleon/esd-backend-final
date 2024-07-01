import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTestEsdUseCase } from '../useCases/create-testEsd.useCase';
import { CreateTestEsdDto } from '../dtos/create-testEsd.dto';
import { Public } from 'src/modules/auth/public';
import { GetTestEsdUseCase } from '../useCases/get-testEsd.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { FilterTestEsdUseCase } from '../useCases/filter-testEsd.useCase';
import { FilterColumnTestEsd } from '../dtos/filter-column-testEsd.dto';

@Controller('testEsd')
export class TesteEsdController {
  constructor(
    private readonly createTestEsdUseCase: CreateTestEsdUseCase,
    private readonly getTestEsdUseCase: GetTestEsdUseCase,
    private readonly filterTestEsdUseCase: FilterTestEsdUseCase,
  ) {}

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getTestEsdUseCase.getTestEsds(search, page);
  }

  @Get('/filter')
  async filterTestEsd(@Query() filter: FilterColumnTestEsd) {
    return this.filterTestEsdUseCase.getFilterTestEsds(filter);
  }

  @Get('/allTestEsds')
  async findAllTestEsdNotPaginateds() {
    return this.getTestEsdUseCase.getAllTestEsdNotPagination();
  }

  @Post()
  @Public()
  create(@Body() createTesteEsdDto: CreateTestEsdDto) {
    return this.createTestEsdUseCase.execute(createTesteEsdDto);
  }
}
