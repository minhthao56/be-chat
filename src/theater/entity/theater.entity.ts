import { MessagesEntity } from './../../messages/entity/message.entity';
import { TimeStamp } from './../../common/time.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';

@Entity()
export class TheaterEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userId: string;

  @Column('text')
  userId2: string;

  @OneToMany(
    () => MessagesEntity,
    message => message.theater,
    {
      cascade: true,
    },
  )
  message: Promise<MessagesEntity>;

  @ManyToOne(
    () => UserEntity,
    user => user,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userId2' })
  user2: UserEntity;
}
