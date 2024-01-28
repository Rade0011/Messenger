import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PollingService } from './polling.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { eventName } from 'src/event-name.enum';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @EventPattern(eventName.createdMessage)
  sendMessage(message: CreateMessageDto) {
    return this.pollingService.sendMessage(message)
  }

  @EventPattern(eventName.seenMessageUpdate)
  sendSeenMessage(message: CreateMessageDto) {
    return this.pollingService.sendSeenMessage(message)
  }
}