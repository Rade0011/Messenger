import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageDocument } from './message.schema';
import { Connection, Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { ERROR_MESSAGE } from '../constans/constans'
import { REDIS_SERVICE } from '../Redis/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { eventName } from 'src/event-name.enum';
import { DB_NAMES } from 'src/db.names';
import { Seen } from 'src/polling/polling.gateway';

@Injectable()
export class MessageService {
  private messageModel;
  
  constructor(
    @InjectConnection(DB_NAMES.messages) private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
  ) {
    this.messageModel = this.connection.model(Message.name);
  }
  async create(message: CreateMessageDto) {
    return await this.messageModel.create(message);
  }

  async handleCreateMessage(message: CreateMessageDto) {
    this.redisClient.emit(eventName.createdMessage, message)
  }

  async handleUpdateMessage(messageId: string) {
    const existingMessage = await this.messageModel.findById(messageId);
    if (!existingMessage.seenAt) {
      const updatedMessage = await this.messageModel.findByIdAndUpdate(
        messageId,
        { seenAt: new Date() },
        { new: true }
      );
      this.redisClient.emit(eventName.seenMessageUpdate, updatedMessage)
    } else {
      this.redisClient.emit(eventName.seenMessageUpdate, existingMessage)
    }
  }

  async findAll() {
    return await this.messageModel.find();
  }

  async findOne(id: string) {
    return await this.messageModel.findById(id);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return await this.messageModel.findByIdAndUpdate(id, updateMessageDto);
  }

  async remove(id: string) {
    return await this.messageModel.findByIdAndDelete(id);
  }

  async deleteMessageByText(text: string) {
    return await this.messageModel.deleteMany({ text });
  }
}
