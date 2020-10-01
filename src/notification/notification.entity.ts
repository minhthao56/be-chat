import { TimeStamp } from './../common/time.entity';
import { UserEntity } from 'src/users/entity/user.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class NoticationsEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userIdRevice: string;

  @Column('text')
  userIdSender: string;

  @Column('text')
  content: string;

  @ManyToOne(
    () => UserEntity,
    user => user,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userIdRevice' })
  user: UserEntity;

  @ManyToOne(
    () => UserEntity,
    user => user,
    {
      cascade: true,
    },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userIdSender' })
  userRequest: UserEntity;
}
