import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-use.dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  // eslint-disable-next-line @typescript-eslint/ban-types
  findAll(@Req() req: Request): Promise<any> {
    console.log('controller' + req.header('token'));
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    console.log(id);

    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.usersService.updateOne(id, createUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<any> {
    return this.usersService.deleteOne(id);
  }
}
