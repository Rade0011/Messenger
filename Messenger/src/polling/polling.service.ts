import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { REDIS_SERVICE } from '../Redis/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { Subject } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { eventName } from 'src/event-name.enum';
import { lastValueFrom } from 'rxjs';
import { ERROR_MESSAGE } from 'src/constans/constans';
import { Seen } from './polling.gateway';

export interface JwtPayload {
  userId: string;
  username: string;
  phoneNumber: number;
}

@Injectable()
export class PollingService {
  private gatewayEvents = new Subject<{event: string, data: any}>()

  constructor(
  @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
  private  readonly configService: ConfigService)
   {}
  
  getEvents() { 
    return this.gatewayEvents;
  }

  handleConnection(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET')!;
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  }

  
 async handleUserChats(userId: string) {
    const findChats = this.redisClient.send({ cmd: 'getUserChats' }, userId);
    return await lastValueFrom(findChats)
  }

  async handleSeenMessage(message: Seen) {
    this.redisClient.emit(eventName.messageRead, message)
  }

  handleMessage(message: CreateMessageDto, clientChats: string[]) {
    const { chat } = message
    const chatAccess = clientChats.includes(chat)
    if (!chatAccess) {
      throw new ForbiddenException(ERROR_MESSAGE.E_CHAT_ACCESS)
    }
    this.redisClient.emit(eventName.recievedMessage, message)
  }
  
  sendMessage(message: CreateMessageDto) { 
    this.gatewayEvents.next({ event: eventName.message, data: message });  
 }

 sendSeenMessage(message: CreateMessageDto) {
  this.gatewayEvents.next({event: eventName.seenMessage, data: message})
 }

}