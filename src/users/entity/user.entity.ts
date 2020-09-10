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

  @OneToMany(
    () => MessagesEntity,
    message => message.user,
  )
  message: Promise<MessagesEntity>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    this.email = this.email.toLowerCase();
  }
}
