import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>

@Schema()
export class Message {
    @Prop({required: true})
    text: string;

    @Prop({required: true})
    author: string;

    @Prop({ default: Date.now})
    createdAt: Date;

    @Prop({required: true})
    chat: string;

    @Prop({default: null})
    seenAt?: Date 

}

export const MessageSchema = SchemaFactory.createForClass(Message)
