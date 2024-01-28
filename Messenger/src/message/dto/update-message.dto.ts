import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
    @ApiProperty()
    text:string;
    @ApiProperty()
    author:string;
    @ApiProperty()
    createdAt?:Date;
}
