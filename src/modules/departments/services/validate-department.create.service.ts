import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentMessageHelper } from 'src/utils/message.helps';
import { DepartmentRepositoryContract } from '../repositories/department.repository.contract';

@Injectable()
export class ValidateDepartmentCreateService {
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
}
