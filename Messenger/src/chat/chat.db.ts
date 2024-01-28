import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { Chat, ChatSchema } from './chat.schema';


export const DB_CONNECTION_NAME = 'chat';
@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('CHAT_DB_CONNECTION'),
            }),
            connectionName: DB_CONNECTION_NAME,
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: Chat.name, schema: ChatSchema },
        ], DB_CONNECTION_NAME),
    ],
})
export class ChatDBModule {}