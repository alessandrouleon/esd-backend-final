import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateEmployeeUseCase } from '../useCases/create-employee.useCase';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeUseCase } from '../useCases/update-employee.useCase';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { DeleteEmployeeUseCase } from '../useCases/delete-employee.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetEmployeeUseCase } from '../useCases/get-employee.useCase';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private readonly getEmployeeUseCase: GetEmployeeUseCase,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.createEmployeeUseCase.execute(createEmployeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.updateEmployeeUseCase.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteEmployeeUseCase.delete(id);
  }

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getEmployeeUseCase.getEmployees(search, page);
  }
}
