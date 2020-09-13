import { LoginDto } from './../dto/login.dto';
import { AuthService } from './../service/auth.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto): Promise<any> {
    return this.authService.login(user);
  }

  @Get()
  async CheckLogin(@Req() req: Request) {
    const token = req.header('token');
    return this.authService.CheckLogin(token);
  }
}
