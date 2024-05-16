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
import { CreateDepartmentUseCase } from '../useCases/create-department.useCase';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { UpdateDepartmentUseCase } from '../useCases/update-department.useCase';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';
import { DeleteDepartmentUseCase } from '../useCases/delete-department.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetDepartmentUseCase } from '../useCases/get-department.useCase';

@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly createDepartmentUseCase: CreateDepartmentUseCase,
    private readonly updateDepartmentUseCase: UpdateDepartmentUseCase,
    private readonly deleteDepartmentUseCase: DeleteDepartmentUseCase,
    private readonly getDepartmentUseCase: GetDepartmentUseCase,
  ) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.createDepartmentUseCase.execute(createDepartmentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.updateDepartmentUseCase.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteDepartmentUseCase.delete(id);
  }

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getDepartmentUseCase.getAllDepartments(search, page);
  }
}
