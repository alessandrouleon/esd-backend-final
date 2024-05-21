import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  DepartmentMessageHelper,
  LineMessageHelper,
  EmployeeMessageHelper,
  ShiftMessageHelper,
} from 'src/utils/message.helps';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';

@Injectable()
export class ValidatesEmployeeCreateService {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}

  async validateNameOnCreate(newName: string): Promise<void> {
    const existName = await this.employeeRepository.findByName(newName);

    if (existName) {
      throw new HttpException(
        EmployeeMessageHelper.EXIST_NAME,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateRegistrationOnCreate(newRegistration: string): Promise<void> {
    const existRegistration =
      await this.employeeRepository.findByRegistration(newRegistration);

    if (existRegistration) {
      throw new HttpException(
        EmployeeMessageHelper.EXIST_REGISTRATION,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateIdsOnCreate(
    shiftId: string,
    departmentId: string,
    lineId: string,
  ): Promise<void> {
    const [shift, department, line] = await Promise.all([
      this.employeeRepository.findShiftById(shiftId),
      this.employeeRepository.findDepartmentById(departmentId),
      this.employeeRepository.findLineById(lineId),
    ]);

    if (!shift) {
      throw new HttpException(
        ShiftMessageHelper.ID_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!department) {
      throw new HttpException(
        DepartmentMessageHelper.ID_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!line) {
      throw new HttpException(
        LineMessageHelper.ID_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
