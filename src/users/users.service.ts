import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-use.dto';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);
    return;
  }
}
