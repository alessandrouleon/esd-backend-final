import { Module } from '@nestjs/common';
import { TesteEsdController } from '../controllers/testeEsd.controller';
import { CreateTesteEsdUseCase } from '../useCases/create-testeEsd.useCase';
import { TesteEsdRepository } from '../repositories/testeEsd.repository';

@Module({
  controllers: [TesteEsdController],
  exports: [],
  providers: [
    CreateTesteEsdUseCase,

    {
      provide: 'TesteEsdRepositoryContract',
      useClass: TesteEsdRepository,
    },
  ],
})
export class TesteEsdModule {}
