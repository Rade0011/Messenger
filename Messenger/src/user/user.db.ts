import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { User, UserSchema } from './user.schema';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

export const DB_CONNECTION_NAME = 'user';
@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('USER_DB_CONNECTION'),
            }),
            connectionName: DB_CONNECTION_NAME,
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ], DB_CONNECTION_NAME),
    ],
})
export class UserDBModule {}