import { User } from '../entity/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-use.dto';
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
    const userInDB = this.findByEmail(createUserDto.email);
    if (userInDB) {
      throw new HttpException('Email is existed', HttpStatus.BAD_REQUEST);
    } else {
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = createUserDto.password;
      return this.usersRepository.save(user);
    }
  }

  findAll(): Promise<any> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<any> {
    return this.usersRepository.findOne(id);
  }

  updateOne(id: string, createUserDto: CreateUserDto): Promise<any> {
    return this.usersRepository.update(id, createUserDto);
  }

  deleteOne(id: string): Promise<any> {
    return this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<any> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
