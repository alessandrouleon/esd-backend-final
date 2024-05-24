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
import { CreateTesteEsdUseCase } from '../useCases/create-testeEsd.useCase';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
// import { UpdateDepartmentUseCase } from '../useCases/update-department.useCase';
// import { UpdateDepartmentDto } from '../dtos/update-department.dto';
// import { DeleteDepartmentUseCase } from '../useCases/delete-department.useCase';
// import { SearchValueInColumn } from 'src/utils/pagination';
// import { GetDepartmentUseCase } from '../useCases/get-department.useCase';

@Controller('testeEsd')
export class TesteEsdController {
  constructor(
    private readonly createTesteEsdUseCase: CreateTesteEsdUseCase,
    // private readonly updateDepartmentUseCase: UpdateDepartmentUseCase,
    // private readonly deleteDepartmentUseCase: DeleteDepartmentUseCase,
    // private readonly getDepartmentUseCase: GetDepartmentUseCase,
  ) {}

  @Post()
  create(@Body() createTesteEsdDto: CreateTesteEsdDto) {
    return this.createTesteEsdUseCase.execute(createTesteEsdDto);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDepartmentDto: UpdateDepartmentDto,
  // ) {
  //   return this.updateDepartmentUseCase.update(id, updateDepartmentDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.deleteDepartmentUseCase.delete(id);
  // }

  // @Get('/search/:page')
  // async findSearch(
  //   @Param('page') page: number,
  //   @Query() search: SearchValueInColumn,
  // ) {
  //   return this.getDepartmentUseCase.getAllDepartments(search, page);
  // }
}
