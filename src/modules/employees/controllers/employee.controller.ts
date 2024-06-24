import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateEmployeeUseCase } from '../useCases/create-employee.useCase';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeUseCase } from '../useCases/update-employee.useCase';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { DeleteEmployeeUseCase } from '../useCases/delete-employee.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetEmployeeUseCase } from '../useCases/get-employee.useCase';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeeFileDto } from '../dtos/employee-file.dto';
import { UploadEmployeeImageService } from 'src/infrastructure/supabase/storage/service/upload-employee-image.service';
import { GetEmployeeImageService } from 'src/infrastructure/supabase/storage/service/get-employee-image.service';
import { GetSingleEmployeeUseCase } from '../useCases/get-single-employee.useCase';
import { Public } from 'src/modules/auth/public';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private readonly getEmployeeUseCase: GetEmployeeUseCase,
    private readonly uploadEmployeeImageService: UploadEmployeeImageService,
    private readonly getAllImageService: GetEmployeeImageService,
    private readonly getSingleEmployeeUseCase: GetSingleEmployeeUseCase,
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImg(
    @UploadedFile()
    file: EmployeeFileDto,
  ) {
    return this.uploadEmployeeImageService.uploadEmployeeImage(file);
  }

  @Get('image/:file')
  async getEmployeeImage(@Param('file') file: string) {
    return await this.getAllImageService.getFile(file);
  }

  @Get('image/')
  async getAllEmployeeImage() {
    return await this.getAllImageService.listFiles();
  }

  @Get('/allEmployee')
  async findAllEmployeeNotPaginateds() {
    return this.getEmployeeUseCase.getAllEmployeeNotPagination();
  }

  ///endpoint usado para teste
  @Get('single-image/:file')
  async getSingleEmployeeImage(@Param('file') file: string) {
    return await this.getAllImageService.getSingleFile(file);
  }

  @Get(':id')
  @Public()
  findSingleEmployee(@Param('id') id: string) {
    return this.getSingleEmployeeUseCase.getSingleEmployee(id);
  }
}
