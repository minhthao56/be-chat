import { MessagesEntity } from './../../messages/entity/message.entity';
import { TimeStamp } from './../../common/time.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TheaterEntity } from 'src/theater/entity/theater.entity';

@Entity()
@Unique(['email', 'name'])
export class UserEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default:
      'https://res.cloudinary.com/du4arxzzj/image/upload/v1590497543/user_lp41pe.png',
  })
  urlAvatar: string;

  @OneToMany(
    () => MessagesEntity,
    message => message.user,
  )
  message: Promise<MessagesEntity>;

  @OneToMany(
    ()=> TheaterEntity, theater=>theater.user
  )
  theater: Promise <TheaterEntity>

  


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    this.email = this.email.toLowerCase();
  }
}
