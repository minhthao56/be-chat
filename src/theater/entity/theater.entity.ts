import { User } from './../../users/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId1: string

  @Column()
  userId2: string

  @ManyToOne(
    () => User,
    user1 => user1.theater,
  )
  @JoinColumn()
  user1: Promise<User>;

  @ManyToOne(
    () => User,
    user2 => user2.theater,
  )
  @JoinColumn()
  user2: Promise<User>;


}
