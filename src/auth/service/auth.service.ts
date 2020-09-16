import { LoginDto } from './../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/service/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(userData: LoginDto): Promise<any> {
    return this.usersService.findByEmail(userData.email);
  }

  async login(user: LoginDto): Promise<any> {
    const userInDB = await this.validateUser(user);
    if (!userInDB) {
      throw new HttpException('Not found email', HttpStatus.NOT_FOUND);
    } else if (!(await bcrypt.compare(user.password, userInDB.password))) {
      throw new HttpException('Password woring', HttpStatus.BAD_REQUEST);
    } else {
      const payload = {
        name: userInDB.name,
        id: userInDB.id,
        email: userInDB.email,
        urlAvatar: userInDB.urlAvatar,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    }
  }

  async CheckLogin(token: string): Promise<any> {
    try {
      const result = await this.jwtService.verify(token);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
