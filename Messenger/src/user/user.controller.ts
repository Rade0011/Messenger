import { UserService } from './user.service';
import {EventPattern, MessagePattern} from "@nestjs/microservices";
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Post, Get, Patch, Param, Delete, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { eventName } from 'src/event-name.enum';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

    @EventPattern(eventName.checkUser)
    async checkUser(createAuthDto: CreateAuthDto) {
      const user = await this.userService.checkUser(createAuthDto);
        this.userService.generateToken(user)
    }
 
   @EventPattern(eventName.checkUserWebsocket)
   async checkUsername(username: string) {
    const user = await this.userService.checkUsername(username);
    this.userService.generateTokenFromWebsocket(user)
   } 

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
