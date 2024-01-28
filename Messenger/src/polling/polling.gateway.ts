import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io'; 
  import { SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
  import { PollingService } from './polling.service';
  import { eventName } from 'src/event-name.enum';
  import { Inject } from '@nestjs/common';
  import { REDIS_SERVICE } from 'src/Redis/redis.module';  
  import { ClientProxy } from '@nestjs/microservices';
  import { JwtPayload } from './polling.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

  export interface AuthSocket extends Socket {
    user: JwtPayload & {chats: string[]}
  }
  
  export type Seen = {
    chatId: string;
    messageId: string;
  };

  @WebSocketGateway()
  export class PollingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    constructor(
       private readonly pollingService: PollingService,
      @Inject(REDIS_SERVICE) private redisClient: ClientProxy,)
    {} 
  
    afterInit(server: Server) {
      console.log('WebSocket Gateway initialized');
      this.pollingService.getEvents() 
      .subscribe({ 
          next: ({event, data}) => { 
              if (data.chat) {
                console.log(`чат в который отправялем сообщение:`, data.chat)
                server.to(data.chat).emit(event, data)
              }
	        },
	     });
  }
  
  async handleConnection(client: AuthSocket) {
    console.log(`Client connected: ${client.id}`);
    const token = client.handshake.headers.authorization as string;
  
    try {
      const user = this.pollingService.handleConnection(token) as JwtPayload & {chats: string[]};
      console.log(user);
      const findChats = await this.pollingService.handleUserChats(user.userId)
      user.chats = findChats
      client.user = user
      if (user.chats) {
        user.chats.forEach(chat => {
          console.log(`Чаты юзера:`, chat)
            client.join(chat);
        });
    }
    } catch (e) { 
      client.disconnect(true); 
    }
  }
  
    handleDisconnect(client: Socket) {  
      console.log(`Client disconnected: ${client.id}`);
    }
      
    sendToClients(msg) { 
      this.server.emit(eventName.message, msg); 
    }
      
    @SubscribeMessage(eventName.message)
    handleMessage(@ConnectedSocket() client: AuthSocket , @MessageBody() data: any) { 
      console.log('message from', client.user);
      const clientChats = client.user.chats
      this.pollingService.handleMessage(data, clientChats); 
    }

    @SubscribeMessage(eventName.seenMessage)
    handleSeen(@MessageBody() data: Seen) {
      this.pollingService.handleSeenMessage(data)
    }

    @SubscribeMessage('ping')
    handlePing() {
      return {
        event: 'pong',
        data: 'pong data',
      };
    }
  }