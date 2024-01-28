import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { REDIS_SERVICE } from 'src/Redis/redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eventName } from 'src/event-name.enum';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy){}

  handleCheckUser(createAuthDto: CreateAuthDto) {
    const token = this.redisClient.emit(eventName.checkUser, createAuthDto);
    return token;
  }

  handleCheckUserFromWebsocket(username: string) {
    this.redisClient.emit(eventName.checkUserWebsocket, username)
  }

  generateToken(user: User) {
    const secret = this.configService.get('JWT_SECRET'); 
    const token = this.jwtService.sign(user, { secret });
    return token;
  }

  generateTokenForWebsocket(user: User) {
    const secret = this.configService.get('JWT_SECRET_WEBSOCKET');
    const token = this.jwtService.sign(user, {secret});
    console.log(token)
    return token;
  }
}

