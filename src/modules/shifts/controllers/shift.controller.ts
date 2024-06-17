import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateShiftUseCase } from '../useCases/create-shift.useCase';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';
import { UpdateShiftDto } from '../dtos/update-shift.dto';
import { DeleteShiftUseCase } from '../useCases/delete-shift.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetShiftUseCase } from '../useCases/get-shift.useCase';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadShiftUseCase } from '../useCases/upload-shift.useCase';

@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly createShiftUseCase: CreateShiftUseCase,
    private readonly updateShiftUseCase: UpdateShiftUseCase,
    private readonly deleteShiftUseCase: DeleteShiftUseCase,
    private readonly getShiftUseCase: GetShiftUseCase,
    private readonly uploadShiftUseCase: UploadShiftUseCase,
  ) {}

  @Post()
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

  @Get('/allShift')
  async findAllNotPaginated() {
    return this.getShiftUseCase.getAllShiftsNotPagination();
  }

  // @Public()
  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFilexls(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.uploadShiftUseCase.parseExcelFile(file);
  }
}
