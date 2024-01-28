import { Module } from '@nestjs/common'; 
import { ChatService } from './chat.service'; 
import { ChatController } from './chat.controller'; 
import { ChatDBModule } from './chat.db'; 
import { RedisModule } from '../Redis/redis.module';
import { ConfigService } from '@nestjs/config';
 
@Module({ 
  imports: [ 
    RedisModule,  
    ChatDBModule, 
  ],
  controllers: [ChatController], 
  providers: [ChatService, ConfigService], 
}) 
export class ChatModule {}
