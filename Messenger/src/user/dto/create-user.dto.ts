import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    phoneNumber: number;
    @ApiProperty()
    password: string;
    @ApiProperty()
    roles?: string[];
}