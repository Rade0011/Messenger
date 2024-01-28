import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { User } from './user.schema';
import { Connection, Model } from 'mongoose';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { REDIS_SERVICE } from 'src/Redis/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { eventName } from 'src/event-name.enum';
import { DB_NAMES } from 'src/db.names';
import { ERROR_MESSAGE } from 'src/constans/constans';


@Injectable()
export class UserService {
  private userModel;
  constructor(
    @InjectConnection(DB_NAMES.users) private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy
  ) {
    this.userModel = this.connection.model(User.name);
  }

  async send(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto)
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async checkUser(createAuthDto: CreateAuthDto): Promise<UserDocument> {
    const user = await this.userModel.findOne({ phoneNumber: createAuthDto.phoneNumber }).exec();
    if (!user) {
    throw new Error(ERROR_MESSAGE.E_USER_ID);
    }
    if (user.password !== createAuthDto.password) {
      throw new Error(ERROR_MESSAGE.E_PASSWORD);
    }
    return user;
  }

  async checkUsername(username: string) {
    const user = await this.userModel.findOne({username}).exec();
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.E_USER_ID)
    }
    return user;
  }

  async generateToken(user: User) {
    this.redisClient.emit(eventName.token, user)
  }

  async generateTokenFromWebsocket(userId: string) {   
    return await this.redisClient.emit(eventName.tokenWebsocket, userId)
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async deleteUserByName(name: string) {
    return await this.userModel.deleteMany({ name });
  }
}

