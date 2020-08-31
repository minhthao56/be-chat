import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-use.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }
}
