import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateShiftUseCase } from '../useCases/create-shift.useCase';
import { CreateShiftDto } from '../dtos/create-shift.dto';
import { UpdateShiftUseCase } from '../useCases/update-shift.useCase';
import { UpdateShiftDto } from '../dtos/update-shift.dto';

@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly createShiftUseCase: CreateShiftUseCase,
    private readonly updateShiftUseCase: UpdateShiftUseCase,
  ) {}

  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.createShiftUseCase.execute(createShiftDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.updateShiftUseCase.update(id, updateShiftDto);
  }
}
