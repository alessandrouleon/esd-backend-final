import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateTesteEsdUseCase } from '../useCases/create-testeEsd.useCase';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
import { AuthEmployeeGuard } from 'src/modules/auth/guard/auth-employee.guard';
@Controller('testeEsd')
export class TesteEsdController {
  constructor(private readonly createTesteEsdUseCase: CreateTesteEsdUseCase) {}

  @Post()
  @UseGuards(AuthEmployeeGuard)
  create(@Body() createTesteEsdDto: CreateTesteEsdDto) {
    return this.createTesteEsdUseCase.execute(createTesteEsdDto);
  }
}
