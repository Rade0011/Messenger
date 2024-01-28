import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConfigService } from '@nestjs/config';
import { MessageDBModule } from './message.db';
import { RedisModule } from '../Redis/redis.module';

@Module({
  imports: [ 
    RedisModule, 
    MessageDBModule, 
  ],
  controllers: [MessageController],
  providers: [MessageService, ConfigService],
})
export class MessageModule {}
