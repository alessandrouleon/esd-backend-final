import { Body, Controller, Post } from '@nestjs/common';
import { CreateShiftUseCase } from '../useCases/create-shift.useCase';
import { CreateShiftDto } from '../dtos/create-shift.dto';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly createShiftUseCase: CreateShiftUseCase) {}

  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.createShiftUseCase.execute(createShiftDto);
  }
}
