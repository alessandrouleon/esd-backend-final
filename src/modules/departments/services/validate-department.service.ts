import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentMessageHelper } from 'src/utils/message.helps';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';

@Injectable()
export class ValidateDepartmentService {
  constructor(
    @Inject('DepartmentRepositoryContract')
    private departmentRepository: DepartmentRepositoryContract,
  ) {}

  async validateCodeAndDescriptionOnCreate(
    code: string,
    description: string,
  ): Promise<void> {
    const [existCode, existeDescription] = await Promise.all([
      this.departmentRepository.findByCode(code),
      this.departmentRepository.findByDecription(description),
    ]);

    if (existCode) {
      throw new HttpException(
        DepartmentMessageHelper.EXIST_CODE,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existeDescription) {
      throw new HttpException(
        DepartmentMessageHelper.EXIST_DESCRIPTION,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateCodeOnUpdate(newCode: string, oldCode: string): Promise<void> {
    if (newCode !== oldCode) {
      const existCode = await this.departmentRepository.findByCode(newCode);
      if (existCode) {
        throw new HttpException(
          DepartmentMessageHelper.EXIST_CODE,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async validateDescriptionOnUpdate(
    newDescription: string,
    oldDescription: string,
  ): Promise<void> {
    if (newDescription !== oldDescription) {
      const existDescription =
        await this.departmentRepository.findByDecription(newDescription);
      console.log('new::', existDescription);

      if (existDescription) {
        throw new HttpException(
          DepartmentMessageHelper.EXIST_DESCRIPTION,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
