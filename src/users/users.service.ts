import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-use.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<any> {
    const user = new User();
    // user.email = createUserDto.email;
    // user.name = createUserDto.name;
    // user.password = createUserDto.password;
    // return this.userRepository.save(user);
    return;
  }
}
