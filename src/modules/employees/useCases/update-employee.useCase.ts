import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';
import { ValidatesEmployeeUpdateService } from '../services/validates.employee.update.service';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeMessageHelper } from 'src/utils/message.helps';
import { newDate } from 'src/utils/date';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
    private validateSevice: ValidatesEmployeeUpdateService,
  ) {}

  async update(id: string, data: UpdateEmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findByEmployeeId(id);

    if (!employee) {
      throw new HttpException(
        EmployeeMessageHelper.ID_NOT_EXIST_FOR_UPDATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await Promise.all([
      this.validateSevice.validateNameOnUpdate(data.name, employee.name),
      this.validateSevice.validateRegistrationOnUpdate(
        data.registration,
        employee.registration,
      ),
      this.validateSevice.validateIdsOnUpdate(
        data.shiftId,
        data.departmentId,
        data.lineId,
      ),
    ]);

    return await this.employeeRepository.updateEmployee(id, {
      ...data,
      updatedAt: newDate(),
    });
  }
}
