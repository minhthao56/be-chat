import { CreateUserDto } from './../../users/dto/create-use.dto';
import { LoginDto } from './../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/service/users.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as generator from 'generate-password';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
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
        id: userInDB.id,
      };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async CheckLogin(token: string): Promise<any> {
    try {
      const result = await this.jwtService.verify(token);
      const userInDB = await this.usersService.findOne(result.id);
      return userInDB;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyJWT(token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verify(token);
      return verify;
    } catch (error) {
      return error;
    }
  }

  async signJwt(payload: any): Promise<any> {
    return this.jwtService.sign(payload);
  }

  async loginWithGoogle(tokenId: string): Promise<any> {
    const client = new OAuth2Client(
      '184515481576-3pr72umu9nmn7mblu4jvn5b45vu1o5uk.apps.googleusercontent.com',
    );
    try {
      const result: any = await client.verifyIdToken({
        idToken: tokenId,
        audience:
          '184515481576-3pr72umu9nmn7mblu4jvn5b45vu1o5uk.apps.googleusercontent.com',
      });
      const { email, name, picture } = result.payload;
      const userInDb = await this.usersService.findByEmail(email);
      console.log(userInDb);

      if (userInDb) {
        return {
          token: await this.jwtService.signAsync({ id: userInDb.id }),
        };
      } else {
        const password = generator.generate({ length: 10, numbers: true });
        const userGoogle = new CreateUserDto();
        userGoogle.email = email;
        userGoogle.name = name;
        userGoogle.urlAvatar = picture;
        userGoogle.password = password;
        userGoogle.confirm = password;
        const tokenCreateUser = await this.usersService.createUser(userGoogle);
        return tokenCreateUser;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
