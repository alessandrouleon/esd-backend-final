import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { ValidatesEmployeeCreateService } from '../services/validates.employee.create.service';
import { GetEmployeeImageService } from 'src/infrastructure/supabase/storage/service/get-employee-image.service';
import { SupabaseValidationMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
    private validateSevice: ValidatesEmployeeCreateService,
    private getEmployeeImageService: GetEmployeeImageService,
  ) {}

  async execute(data: CreateEmployeeDto): Promise<EmployeeEntity> {
    await Promise.all([
      this.validateSevice.validateNameOnCreate(data.name),
      this.validateSevice.validateRegistrationOnCreate(data.registration),
      this.validateSevice.validateIdsOnCreate(
        data.shiftId,
        data.departmentId,
        data.lineId,
      ),
    ]);

    let imageId: string = null;
    if (data.imageId.trim()) {
      const existeEmployeeImage =
        await this.getEmployeeImageService.getSingleFile(data.imageId);
      imageId = existeEmployeeImage.id;

      if (!existeEmployeeImage) {
        throw new HttpException(
          SupabaseValidationMessageHelper.IMAGE_NOT_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.employeeRepository.createEmployee({
      ...data,
      imageId,
    });
  }
}
