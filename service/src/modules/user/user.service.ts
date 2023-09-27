import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user/user.service';
import { UserModel } from '@models/user.model';
import { CreateUserDto } from '@dtos/user/create-user.dto';
import { BcryptService } from '@services/bcrypt/bcrypt.service';
import { UpdateUserDto } from '@dtos/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) { }

  async countUserAll(): Promise<number> {
    return this.userRepository.count()
  }

  async findUserAll(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async findUserTrashAll(): Promise<UserModel[]> {
    return this.userRepository.findTrashAll();
  }

  async findUserOne(userId: string): Promise<UserModel> {
    const userModel: UserModel = await this.userRepository.findOne(userId);
    if (!userModel) { throw new NotFoundException(`user not found`); }

    return userModel;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const existUserCode: UserModel = await this.userRepository.findOneByUserCode(createUserDto.userCode);
    if (existUserCode) { throw new BadRequestException(`user_code has exist`); }

    const existEmail: UserModel = await this.userRepository.findOneByEmail(createUserDto.userCode);
    if (existEmail) { throw new BadRequestException(`email has exist`); }

    const userModel: UserModel = new UserModel();
    userModel.userCode = createUserDto.userCode;
    userModel.firstName = createUserDto.firstName;
    userModel.lastName = createUserDto.lastName;
    userModel.position = createUserDto.position;
    userModel.age = createUserDto.age;
    userModel.phoneNumber = createUserDto.phoneNumber;
    userModel.email = createUserDto.email;
    userModel.password = await this.bcryptService.hash(createUserDto.password);

    const newUserModel: UserModel = await this.userRepository.create(userModel);
    if (!newUserModel) { throw new BadRequestException(`create new user failed`); }

    return newUserModel;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const existUserModel: UserModel = await this.userRepository.findOne(userId);
    if (!existUserModel) { throw new NotFoundException(`user hasn't exist`); }

    // const existUserCode: UserModel = await this.userRepository.findOneByUserCode(updateUserDto.userCode);
    // if (existUserCode) { throw new BadRequestException(`user_code has exist`); }

    // const existEmail: UserModel = await this.userRepository.findOneByEmail(updateUserDto.userCode);
    // if (existEmail) { throw new BadRequestException(`email has exist`); }

    const userModel: UserModel = new UserModel();
    userModel.userCode = updateUserDto.userCode;
    userModel.firstName = updateUserDto.firstName;
    userModel.lastName = updateUserDto.lastName;
    userModel.position = updateUserDto.position;
    userModel.age = updateUserDto.age;
    userModel.phoneNumber = updateUserDto.phoneNumber;
    userModel.email = updateUserDto.email;
    userModel.password = updateUserDto.password && await this.bcryptService.hash(updateUserDto.password);

    const updateUserModel: boolean = await this.userRepository.update(userId, userModel);
    if (!updateUserModel) { throw new BadRequestException(`update user failed`); }

    const newUserModel: UserModel = await this.userRepository.findOne(userId);

    return newUserModel;
  }

  async removeUser(userId: string): Promise<UserModel> {
    const existUserModel: UserModel = await this.userRepository.findOne(userId);
    if (!existUserModel) { throw new NotFoundException(`user hasn't exist`); }

    const userRemoved: boolean = await this.userRepository.remove(userId);
    if (!userRemoved) { throw new BadRequestException(`remove user failed`); }

    return existUserModel;
  }

  async deleteUser(userId: string): Promise<UserModel> {
    const existUserModel: UserModel = await this.userRepository.findOneWithDelete(userId);
    if (!existUserModel) { throw new NotFoundException(`user hasn't exist`); }

    const userDeleted: boolean = await this.userRepository.delete(userId);
    if (!userDeleted) { throw new BadRequestException(`delete user failed`); }

    return existUserModel;
  }

  async restoreUser(userId: string): Promise<UserModel> {
    const existUserModel: UserModel = await this.userRepository.findOneWithDelete(userId);
    if (!existUserModel) { throw new NotFoundException(`user hasn't exist`); }

    const userRestored: boolean = await this.userRepository.restore(userId);
    if (!userRestored) { throw new BadRequestException(`restore user failed`); }

    return existUserModel;
  }
}
