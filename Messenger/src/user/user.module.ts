import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { UserDBModule } from './user.db';
import { RedisModule } from 'src/Redis/redis.module';
import { JwtService } from '@nestjs/jwt';



@Module({
  imports: [ 
    RedisModule,
    UserDBModule,
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService, JwtService],
})
export class UserModule {}
