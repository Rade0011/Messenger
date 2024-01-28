import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../constans/roles.enum'
import { Document, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true})
    username: string;

    @Prop({required: true, unique: true})
    phoneNumber: number;

    @Prop({required: true})
    password: string;

    @Prop({default: Role.USER})
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);