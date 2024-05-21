import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  DepartmentMessageHelper,
  LineMessageHelper,
  EmployeeMessageHelper,
  ShiftMessageHelper,
} from 'src/utils/message.helps';
import { EmployeeRepositoryContract } from '../repositories/employee.repository.contract';

@Injectable()
export class ValidatesEmployeeUpdateService {
  constructor(
    @Inject('EmployeeRepositoryContract')
    private employeeRepository: EmployeeRepositoryContract,
  ) {}

  async validateNameOnUpdate(newName: string, oldName: string): Promise<void> {
    if (newName !== oldName) {
      throw new HttpException(
        EmployeeMessageHelper.EXIST_NAME,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateRegistrationOnUpdate(
    newRegistration: string,
    oldRegistration: string,
  ): Promise<void> {
    if (newRegistration !== oldRegistration) {
      throw new HttpException(
        EmployeeMessageHelper.EXIST_REGISTRATION,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateIdsOnUpdate(
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
