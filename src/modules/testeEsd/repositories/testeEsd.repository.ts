import { Injectable } from '@nestjs/common';
import {
  //   ITesteEsdReturnWithPagination,
  TesteEsdRepositoryContract,
} from './testeEsd.repository.contract';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';
// import { PaginatedData } from 'src/utils/pagination';
import { CreateTesteEsdDto } from '../dtos/create-testeEsd.dto';
import { TesteEsdEntity } from '../entities/testeEsd.entity';

@Injectable()
export class TesteEsdRepository implements TesteEsdRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createTesteEsd(
    data: CreateTesteEsdDto,
  ): Promise<TesteEsdEntity> {
    return await this.repository.testeEsd.create({ data });
  }

  public async findByRegistration(
    registration: string,
  ): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { registration, deletedAt: null },
    });
  }

  public async findByBoot(boot: string): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { boot, deletedAt: null },
    });
  }

  public async findByBracelete(
    bracelete: string,
  ): Promise<EmployeeEntity | null> {
    return await this.repository.employee.findFirst({
      where: { bracelete, deletedAt: null },
    });
  }

  //   findFilteredTesteEsdWithPagination(
  //     value: string,
  //     parametersToPaginate: PaginatedData,
  //   ): Promise<ITesteEsdReturnWithPagination> {
  //     throw new Error('Method not implemented.');
  //   }

  //   findAllTestesEsdWithPagination(
  //     parametersToPaginate: PaginatedData,
  //   ): Promise<ITesteEsdReturnWithPagination> {
  //     throw new Error('Method not implemented.');
  //   }
}
