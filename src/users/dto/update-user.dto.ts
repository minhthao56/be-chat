import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(4, 20)
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 10)
  password: string;

  @Length(8, 10)
  confirm: string;

  urlAvatar: string;

  urlBanner: string;
}
