import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(4, 20)
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 10)
  password: string;
}
