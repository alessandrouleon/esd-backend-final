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
import { CreateLineUseCase } from '../useCases/create-line.useCase';
import { CreateLineDto } from '../dtos/create-line.dto';
import { UpdateLineUseCase } from '../useCases/update-line.useCase';
import { UpdateLineDto } from '../dtos/update-line.dto';
import { DeleteLineUseCase } from '../useCases/delete-line.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetLineUseCase } from '../useCases/get-line.useCase';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadLineUseCase } from '../useCases/upload-line.useCase';

@Controller('lines')
export class LineController {
  constructor(
    private readonly createLineUseCase: CreateLineUseCase,
    private readonly updateLineUseCase: UpdateLineUseCase,
    private readonly deleteLineUseCase: DeleteLineUseCase,
    private readonly getLineUseCase: GetLineUseCase,
    private readonly uploadLineUseCase: UploadLineUseCase,
  ) {}

  @Post()
  create(@Body() createLineDto: CreateLineDto) {
    return this.createLineUseCase.execute(createLineDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLineDto: UpdateLineDto) {
    return this.updateLineUseCase.update(id, updateLineDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteLineUseCase.delete(id);
  }

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getLineUseCase.getLines(search, page);
  }

  @Get('/allLines')
  async findAllNotPaginated() {
    return this.getLineUseCase.getAllLinesNotPagination();
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFilexls(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.uploadLineUseCase.parseExcelFile(file);
  }
}
