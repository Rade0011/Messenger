import { Test } from '@nestjs/testing';
import { PollingGateway } from './polling.gateway';
import { PollingService } from './polling.service';
import { Socket, io } from 'socket.io-client';
import { RedisModule } from '../Redis/redis.module';
import { INestApplication } from '@nestjs/common';
import { TEST_TOKEN } from './helpers/constans-jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { CreateUserDto } from '../user/dto/create-user.dto';

describe('PollingGateway', () => {
  let gateway: PollingGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [RedisModule, ConfigModule.forRoot()],
      providers: [PollingGateway, PollingService, ConfigService],
    }).compile();

    gateway = testingModule.get<PollingGateway>(PollingGateway);

    ioClient = io('ws://localhost:3001', {
      autoConnect: false,
      transports: ['websocket'],
      auth: {
        token: TEST_TOKEN,
      }
    });

    app = await testingModule.createNestApplication();
    app.listen(3001);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit -pong', async () => {
    ioClient.connect();

    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        ioClient.emit('ping');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('pong data');
        resolve();
      });
    });
    ioClient.disconnect();
  });

  it('should be create user', async () => {
    ioClient.connect();

    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        ioClient.emit('create user');
      });
      ioClient.on('user', (data) => {
        expect(data).toBeDefined();
        resolve();
    });
  });
  ioClient.disconnect();
});
});