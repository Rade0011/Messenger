import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException,} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { eventName } from 'src/event-name.enum';
import { Seen } from 'src/polling/polling.gateway';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  
  @EventPattern(eventName.recievedMessage)
  async handleCreateMessage(message: CreateMessageDto) {
    const createMessage = await this.messageService.create(message)
    this.messageService.handleCreateMessage(createMessage)
  }

  @EventPattern(eventName.messageRead)
  async handleUpdateMessage(message: Seen) {
    this.messageService.handleUpdateMessage(message.messageId)

  }
  
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}