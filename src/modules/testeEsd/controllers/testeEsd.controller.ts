import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTestEsdUseCase } from '../useCases/create-testEsd.useCase';
import { CreateTestEsdDto } from '../dtos/create-testEsd.dto';
import { Public } from 'src/modules/auth/public';
import { GetTestEsdUseCase } from '../useCases/get-testEsd.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';

@Controller('testEsd')
export class TesteEsdController {
  constructor(
    private readonly createTestEsdUseCase: CreateTestEsdUseCase,
    private readonly getTestEsdUseCase: GetTestEsdUseCase,
  ) {}

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getTestEsdUseCase.getTestEsds(search, page);
  }

  @Post()
  @Public()
  create(@Body() createTesteEsdDto: CreateTestEsdDto) {
    return this.createTestEsdUseCase.execute(createTesteEsdDto);
  }
}
