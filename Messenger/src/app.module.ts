import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { REDIS_SERVICE } from './Redis/redis.module';
import { PollingModule } from './polling/polling.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ClientsModule.register([
        {
            name: REDIS_SERVICE,
            transport: Transport.REDIS,
            options: {
                host: 'localhost',
                port: 6379,
            },
        },
    ]),
    UserModule,
    ChatModule,
    MessageModule,
    PollingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
