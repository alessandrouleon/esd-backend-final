import { Body, Controller, Post } from '@nestjs/common';
import { CreateTesteEsdUseCase } from '../useCases/create-testeEsd.useCase';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
import { Public } from 'src/modules/auth/public';

@Controller('testeEsd')
export class TesteEsdController {
  constructor(private readonly createTesteEsdUseCase: CreateTesteEsdUseCase) {}

  @Post()
  @Public()
  create(@Body() createTesteEsdDto: CreateTesteEsdDto) {
    return this.createTesteEsdUseCase.execute(createTesteEsdDto);
  }
}
