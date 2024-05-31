import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { EmployeeEntity } from '../entities/employee.entity';
import { GetEmployeeImageService } from 'src/infrastructure/supabase/storage/service/get-employee-image.service';

@Injectable()
export class GetSingleEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
    private getAllImageService: GetEmployeeImageService,
  ) {}

  public async getSingleEmployee(id: string): Promise<EmployeeEntity> {
    const employeeId = await this.employeeRepository.findByEmployeeId(id);

    if (employeeId.imageId) {
      const supabaseImage = await this.getAllImageService.findBySupabaseImageId(
        employeeId.imageId,
      );
      if (supabaseImage) {
        const supabaseImageName = supabaseImage
          .map((item: any) => item.name)
          .toString();

        const supabaseNameImage =
          await this.getAllImageService.getFile(supabaseImageName);
        employeeId.imageId = supabaseNameImage;
      }
    }

    return employeeId;
  }
}
