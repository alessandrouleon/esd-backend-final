import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  DepartmentMessageHelper,
  LineMessageHelper,
  OperatorMessageHelper,
  ShiftMessageHelper,
} from 'src/utils/message.helps';
import { OperatorRepositoryContract } from '../repositories/operator.repository.contract';

@Injectable()
export class ValidatesOperatorCreateService {
  constructor(
    @Inject('OperatorRepositoryContract')
    private operatorRepository: OperatorRepositoryContract,
  ) {}

  async validateNameOnCreate(newName: string): Promise<void> {
    const existName = await this.operatorRepository.findByName(newName);

    if (existName) {
      throw new HttpException(
        OperatorMessageHelper.EXIST_NAME,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateRegistrationOnCreate(newRegistration: string): Promise<void> {
    const existRegistration =
      await this.operatorRepository.findByRegistration(newRegistration);

    if (existRegistration) {
      throw new HttpException(
        OperatorMessageHelper.EXIST_REGISTRATION,
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
