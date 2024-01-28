import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from './Redis/redis.module';

@Injectable()
export class AppService {
  constructor(
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  async getUserById(id: string) {
    return this.redisClient.send({cmd: 'get'}, id)
  }
}
