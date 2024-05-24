import { Inject, Injectable } from '@nestjs/common';
import { TesteEsdRepositoryContract } from '../repositories/testeEsd.repository.contract';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
// import { ValidatesEmployeeCreateService } from '../services/validates.employee.create.service';
// import { GetEmployeeImageService } from 'src/infrastructure/supabase/storage/service/get-employee-image.service';
// import { SupabaseValidationMessageHelper } from 'src/utils/message.helps';
import { TesteEsdEntity } from '../entities/testeEsd.entity';

@Injectable()
export class CreateTesteEsdUseCase {
  constructor(
    @Inject('TesteEsdRepositoryContract')
    private testeEsdRepository: TesteEsdRepositoryContract,
    // private validateSevice: ValidatesEmployeeCreateService,
    // private getEmployeeImageService: GetEmployeeImageService,
  ) {}

  async execute(data: CreateTesteEsdDto): Promise<TesteEsdEntity> {
    // await Promise.all([
    //   this.validateSevice.validateNameOnCreate(data.name),
    //   this.validateSevice.validateRegistrationOnCreate(data.registration),
    //   this.validateSevice.validateIdsOnCreate(
    //     data.shiftId,
    //     data.departmentId,
    //     data.lineId,
    //   ),
    // ]);

    return await this.testeEsdRepository.createTesteEsd({
      ...data,
    });
  }
}
