import { TimeStamp } from './../../common/time.entity';
// import { User } from './../../users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { TheaterEntity } from 'src/theater/entity/theater.entity';

@Entity()
export class MessagesEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  theaterId: string;

  @Column()
  content: string;

  @ManyToOne(
    () => UserEntity,
    user => user.message,
  )
  @JoinColumn()
  user: Promise<UserEntity>;

  @ManyToOne(
    () => TheaterEntity,
    theater => theater.message,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn()
  theater: TheaterEntity;
}
