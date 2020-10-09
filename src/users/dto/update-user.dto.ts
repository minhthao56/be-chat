// import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  name: string;

  email: string;

  password: string;

  confirm: string;

  urlAvatar: string;

  urlBanner: string;

  status: boolean;
}
