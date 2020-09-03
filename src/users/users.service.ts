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
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }
  findAll(): Promise<any> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<any> {
    return this.usersRepository.findOne(id);
  }
  updateOne(id: number, createUserDto: CreateUserDto): Promise<any> {
    return this.usersRepository.update(id, createUserDto);
  }
  deleteOne(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
