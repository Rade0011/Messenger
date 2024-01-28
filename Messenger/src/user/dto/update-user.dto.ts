import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    username: string;
    @ApiProperty()
    phoneNumber: number;
    @ApiProperty()
    password: string;
    @ApiProperty()
    roles?: string[];
}