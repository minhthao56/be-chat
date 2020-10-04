import { CreateUserDto } from './../../users/dto/create-use.dto';
import { UsersService } from './../../users/service/users.service';
import { LoginDto } from './../dto/login.dto';
import { AuthService } from './../service/auth.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() user: LoginDto): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async CheckLogin(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.CheckLogin(token);
  }
}
