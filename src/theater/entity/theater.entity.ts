import { MessagesEntity } from './../../messages/entity/message.entity';
import { TimeStamp } from './../../common/time.entity';
// import { User } from './../../users/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class TheaterEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  userId2: string;

  @OneToMany(
    () => MessagesEntity,
    message => message.theater,
    {
      cascade: true,
    },
  )
  message: Promise<MessagesEntity>;
}
