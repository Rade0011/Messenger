import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.schema";

export class CreateMessageDto {
    @ApiProperty()
    text:string;
    @ApiProperty()
    author:string;
    @ApiProperty()
    createdAt?:Date;
    @ApiProperty()
    chat: string;
}
