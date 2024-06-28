import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Patch,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateUserUseCase } from '../useCases/create-user.useCase';
import { CreateUserDto } from '../dtos/create-user.dto';

import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from '../useCases/update-user.useCase';
import { DeleteUserUseCase } from '../useCases/delete-user.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { GetUserUseCase } from '../useCases/get-user.useCase';
// import { Public } from 'src/modules/auth/public';
import { UpdateUserPasswordUseCase } from '../useCases/update-user-password.useCase';
import { UpdateUserPasswordDto } from '../dtos/update-user-password.dto';
import { UploadUserUseCase } from '../useCases/upload-user.useCase';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
    private readonly uploadUserUseCase: UploadUserUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Patch(':id')
  // @Public()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.update(id, updateUserDto);
  }

  @Patch('update/password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.updateUserPasswordUseCase.updatePassword(
      id,
      updateUserPasswordDto,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUserUseCase.delete(id);
  }

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getUserUseCase.getUsers(search, page);
  }

  @Get('/allUsers')
  async findAllUsersNotPaginateds() {
    return this.getUserUseCase.getAllUsersNotPagination();
  }

  @Get(':id')
  findSingleUser(@Param('id') id: string) {
    return this.getUserUseCase.getSingleUser(id);
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFilexls(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.uploadUserUseCase.parseExcelFile(file);
  }
}
