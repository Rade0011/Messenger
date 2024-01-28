import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { eventName } from 'src/event-name.enum';
import { User } from 'src/user/user.schema';
import { JwtPayload } from 'src/polling/polling.service';
import { SubscribeMessage } from '@nestjs/websockets';
import { Observable } from 'rxjs';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @MessagePattern({cmd:'getUserChats'})
  handleGetUserChats(userId: string) {
    return this.chatService.checkUserInChats(userId)
  }
 

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param(':id') id: string) {
    return this.chatService.remove(id);
  }
}
