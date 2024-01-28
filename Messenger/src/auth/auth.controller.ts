import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EventPattern } from '@nestjs/microservices';
import { IsToken } from './decorators/check-token.decorators';
import { eventName } from 'src/event-name.enum';
import { User } from 'src/user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async handleCheck(@Body() createAuthDto: CreateAuthDto) {
    const token = this.authService.handleCheckUser(createAuthDto)
    return token;
  }

  @IsToken() 
  @Post('websocket')
  async handleCheckForWebsocket(@Body('username') username: string) {
    this.authService.handleCheckUserFromWebsocket(username);
  }

  @EventPattern(eventName.tokenWebsocket)
  async generateTokenFromWebsocket(user: User) {
    const token = this.authService.generateTokenForWebsocket(user);
    console.log(token)
    return token;
  }

  @EventPattern(eventName.token)
  async generateToken(user: User) {
    const token = this.authService.generateToken(user);
    console.log(token)
    return token;
  }
}

