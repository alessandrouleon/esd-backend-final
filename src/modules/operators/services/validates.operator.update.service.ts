import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  DepartmentMessageHelper,
  LineMessageHelper,
  OperatorMessageHelper,
  ShiftMessageHelper,
} from 'src/utils/message.helps';
import { OperatorRepositoryContract } from '../repositories/operator.repository.contract';

@Injectable()
export class ValidatesOperatorUpdateService {
  constructor(
    @Inject('OperatorRepositoryContract')
    private operatorRepository: OperatorRepositoryContract,
  ) {}

  async validateNameOnUpdate(newName: string, oldName: string): Promise<void> {
    if (newName !== oldName) {
      throw new HttpException(
        OperatorMessageHelper.EXIST_NAME,
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
        OperatorMessageHelper.EXIST_REGISTRATION,
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
      this.operatorRepository.findShiftById(shiftId),
      this.operatorRepository.findDepartmentById(departmentId),
      this.operatorRepository.findLineById(lineId),
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
