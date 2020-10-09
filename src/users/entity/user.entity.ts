import { FriendEntity } from './../../friends/friends.entity';
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

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column({
    default:
      'https://res.cloudinary.com/du4arxzzj/image/upload/v1590497543/user_lp41pe.png',
    type: 'text',
  })
  urlAvatar: string;

  @Column({ default: 'https://picsum.photos/200', type: 'text' })
  urlBanner: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @OneToMany(
    () => MessagesEntity,
    message => message.user,
    {
      cascade: true,
    },
  )
  message: Promise<MessagesEntity>;

  @OneToMany(
    () => TheaterEntity,
    theater => theater,
    {
      cascade: true,
    },
  )
  theater: Promise<TheaterEntity>;

  // @OneToMany(
  //   () => FriendEntity,
  //   friend => friend.user,
  // )
  // friend: FriendEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    this.email = this.email.toLowerCase();
  }
}
