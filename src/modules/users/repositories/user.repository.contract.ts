import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginatedData } from 'src/utils/pagination';
import { EmployeeEntity } from 'src/modules/employees/entities/employee.entity';

export interface IUserReturnWithPagination {
  users: UserEntity[];
  total: number;
}

export interface UserRepositoryContract {
  createUser(data: CreateUserDto): Promise<UserEntity>;
  findByUserName(username: string): Promise<UserEntity | null>;
  findByPassword(password: string): Promise<UserEntity | null>;
  findByUserId(id: string): Promise<UserEntity | null>;
  findByEmployeeId(id: string): Promise<EmployeeEntity | null>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserEntity>;
  deleteUser(id: string, data: UpdateUserDto): Promise<UserEntity>;
  findFilteredUsersWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<IUserReturnWithPagination | null>;
  findAllUsersWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<IUserReturnWithPagination | null>;
}
