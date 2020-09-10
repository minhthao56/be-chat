import { UserEntity } from '../entity/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-use.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const user = new UserEntity();
    const userInDB = await this.findByEmail(createUserDto.email);

    if (userInDB) {
      throw new HttpException('Email is existed', HttpStatus.BAD_REQUEST);
    } else {
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = createUserDto.password;
      return await this.usersRepository.save(user);
    }
  }

  async findAll(): Promise<any> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<any> {
    return await this.usersRepository.findOne(id);
  }

  async updateOne(id: string, createUserDto: CreateUserDto): Promise<any> {
    return await this.usersRepository.update(id, createUserDto);
  }

  async deleteOne(id: string): Promise<any> {
    return this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<any> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
