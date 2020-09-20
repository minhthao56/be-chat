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
export class FriendEntity extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userId: string;

  @Column('text')
  userIdRequest: string;

  @Column({ default: 1, type: 'text' })
  status: number;

  @Column({ default: 'Kết bạn nhé!!!', type: 'text' })
  content: string;

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
      cascade: true,
    },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'userIdRequest' })
  userRequest: UserEntity;
}
