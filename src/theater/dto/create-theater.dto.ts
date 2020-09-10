import { IsNotEmpty } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  userId: string;
  
  @IsNotEmpty()
  userId2: string
}
