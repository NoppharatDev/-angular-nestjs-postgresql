import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModel } from '@models/user.model';
import { IGenericRepository } from '@interfaces/generic.interface';

@Injectable()
export class UserRepository implements IGenericRepository<UserModel> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  async count(): Promise<number> {
    return await this.userRepository.count();
  }

  async findAll(): Promise<UserModel[]> {
    return UserRepository.toUserModels(await this.userRepository.find({ order: { createdAt: "DESC" } }));
  }
  async findTrashAll(): Promise<UserModel[]> {
    return UserRepository.toUserModels(await this.userRepository.find({ order: { createdAt: "DESC" }, where: { deletedAt: Not(IsNull()) }, withDeleted: true }));
  }

  async findOne(userId: string): Promise<UserModel> {
    return UserRepository.toUserModel(await this.userRepository.findOneBy({ id: userId }));
  }

  async findOneWithDelete(userId: string): Promise<UserModel> {
    return UserRepository.toUserModel(await this.userRepository.findOne({ where: { id: userId }, withDeleted: true }));
  }

  async findOneByUserCode(userCode: string): Promise<UserModel> {
    return UserRepository.toUserModel(await this.userRepository.findOneBy({ userCode: userCode }));
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return UserRepository.toUserModel(await this.userRepository.findOneBy({ email: email }));
  }

  async create(preOrderModel: UserModel): Promise<UserModel> {
    const preOrderEntity = UserRepository.toUserEntity(preOrderModel);

    return UserRepository.toUserModel(await this.userRepository.save(preOrderEntity));
  }

  async update(userId: string, preOrderModel: UserModel): Promise<boolean> {
    const preOrderEntity = UserRepository.toUserEntity(preOrderModel);

    return (await this.userRepository.update(userId, preOrderEntity)).affected ? true : false;
  }

  async remove(userId: string): Promise<boolean> {
    return (await this.userRepository.softDelete(userId)).affected ? true : false;
  }

  async restore(userId: string): Promise<boolean> {
    return (await this.userRepository.restore(userId)).affected ? true : false;
  }

  async delete(userId: string): Promise<boolean> {
    return (await this.userRepository.delete(userId)).affected ? true : false;
  }

  private static toUserModel(preOrderEntity: UserEntity): UserModel {
    if (!preOrderEntity) { return; }

    const preOrderModel: UserModel = new UserModel();
    preOrderModel.userId = preOrderEntity.id;
    preOrderModel.userCode = preOrderEntity.userCode;
    preOrderModel.firstName = preOrderEntity.firstName;
    preOrderModel.lastName = preOrderEntity.lastName;
    preOrderModel.position = preOrderEntity.position;
    preOrderModel.age = preOrderEntity.age;
    preOrderModel.phoneNumber = preOrderEntity.phoneNumber;
    preOrderModel.email = preOrderEntity.email;
    preOrderModel.password = preOrderEntity.password;
    preOrderModel.createdAt = preOrderEntity.createdAt;
    preOrderModel.updatedAt = preOrderEntity.updatedAt;
    preOrderModel.updatedAt = preOrderEntity.deletedAt;
    preOrderModel.deletedAt = preOrderEntity.updatedAt;

    return preOrderModel;
  }

  private static toUserEntity(preOrderModel: UserModel): UserEntity {
    if (!preOrderModel) { return; }

    const preOrderEntity: UserEntity = new UserEntity();
    preOrderEntity.id = preOrderModel.userId;
    preOrderEntity.userCode = preOrderModel.userCode;
    preOrderEntity.firstName = preOrderModel.firstName;
    preOrderEntity.lastName = preOrderModel.lastName;
    preOrderEntity.position = preOrderModel.position;
    preOrderEntity.age = preOrderModel.age;
    preOrderEntity.phoneNumber = preOrderModel.phoneNumber;
    preOrderEntity.email = preOrderModel.email;
    preOrderEntity.password = preOrderModel.password;
    preOrderEntity.createdAt = preOrderModel.createdAt;
    preOrderEntity.updatedAt = preOrderModel.updatedAt;
    preOrderEntity.updatedAt = preOrderModel.deletedAt;
    preOrderEntity.deletedAt = preOrderModel.updatedAt;

    return preOrderEntity;
  }

  private static toUserModels(preOrderEntities: UserEntity[]): UserModel[] {
    return preOrderEntities.map(preOrderEntity => UserRepository.toUserModel(preOrderEntity));
  }

  private static toPreOrderEntities(preOrderModels: UserModel[]): UserEntity[] {
    return preOrderModels.map(preOrderModel => UserRepository.toUserEntity(preOrderModel));
  }
}
