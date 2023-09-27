import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '@models/user.model';
import { CatchHttpException } from '@middlewares/utils/catch-http-exception';
import { CreateUserDto } from '@dtos/user/create-user.dto';
import { ResponseModel } from '@models/response.model';
import { UpdateUserDto } from '@dtos/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findUserAll(
  ): Promise<ResponseModel<UserModel[]>> {
    try {
      return new ResponseModel<UserModel[]>({
        statusCode: HttpStatus.OK,
        message: "get user all successfully",
        data: await this.userService.findUserAll()
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Get('trash')
  @HttpCode(HttpStatus.OK)
  async findUserTrashAll(
  ): Promise<ResponseModel<UserModel[]>> {
    try {
      return new ResponseModel<UserModel[]>({
        statusCode: HttpStatus.OK,
        message: "get user trash all successfully",
        data: await this.userService.findUserTrashAll()
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Get('count')
  @HttpCode(HttpStatus.OK)
  async countUserAll(
  ): Promise<ResponseModel<number>> {
    try {
      return new ResponseModel<number>({
        statusCode: HttpStatus.OK,
        message: "get count user all successfully",
        data: await this.userService.countUserAll()
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async findUserOne(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<ResponseModel<UserModel>> {
    try {
      return new ResponseModel<UserModel>({
        statusCode: HttpStatus.OK,
        message: "get user detail successfully",
        data: await this.userService.findUserOne(userId)
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<ResponseModel<UserModel>> {
    try {
      return new ResponseModel<UserModel>({
        statusCode: HttpStatus.CREATED,
        message: "add new user successfully",
        data: await this.userService.createUser(createUserDto)
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseModel<UserModel>> {
    try {
      return new ResponseModel<UserModel>({
        statusCode: HttpStatus.CREATED,
        message: "update user successfully",
        data: await this.userService.updateUser(userId, updateUserDto)
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Delete('remove/:userId')
  @HttpCode(HttpStatus.OK)
  async removeUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<ResponseModel<UserModel>> {
    try {
      return new ResponseModel<UserModel>({
        statusCode: HttpStatus.OK,
        message: "remove user successfully",
        data: await this.userService.removeUser(userId)
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Post('restore/:userId')
  @HttpCode(HttpStatus.OK)
  async restoreUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<ResponseModel<UserModel>> {
    try {
      return new ResponseModel<UserModel>({
        statusCode: HttpStatus.OK,
        message: "restore user successfully",
        data: await this.userService.restoreUser(userId)
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }

  @Delete('delete/:userId')
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<ResponseModel<UserModel>> {
    try {
      return new ResponseModel<UserModel>({
        statusCode: HttpStatus.OK,
        message: "delete user successfully",
        data: await this.userService.deleteUser(userId)
      })
    } catch (error) {
      CatchHttpException.process(error)
    }
  }
}
