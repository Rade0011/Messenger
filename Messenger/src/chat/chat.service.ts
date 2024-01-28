import { ForbiddenException, Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Connection } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { REDIS_SERVICE } from '../Redis/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { eventName } from 'src/event-name.enum';
import { ERROR_MESSAGE } from 'src/constans/constans';
import { DB_NAMES } from 'src/db.names';
import { User } from 'src/user/user.schema';
import { JwtPayload } from 'src/polling/polling.service';

@Injectable()
export class ChatService {
  private chatModel;
  constructor(
    @InjectConnection(DB_NAMES.chat) private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
  ) {
    this.chatModel = this.connection.model(Chat.name);
  }
  async create(createChatDto: CreateChatDto) {
    return await this.chatModel.create(createChatDto);
  }

  async checkUserInChats(userId: string) {
    const chats = await this.chatModel.find({ members: userId }).select('_id').exec();
    const chatIds = chats.map((chat) => chat._id.toString());
    console.log(chatIds);
    return chatIds;
  }
  
  async sendFindChat(chat: string[]) {
    this.redisClient.emit(eventName.sendVerifiedMessage, chat)
  }

  async findAll() {
    return await this.chatModel.find();
  }

  async findOne(id: string) {
    return await this.chatModel.findById(id);
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    return await this.chatModel.findByIdAndUpdate(id, updateChatDto);
  }

  async remove(id: string) {
    return await this.chatModel.findByIdAndDelete(id);
  }

  async deleteChatByTitle(title: string) {
    return await this.chatModel.deleteMany({ title });
  }
}
