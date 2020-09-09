import { User } from './../../users/entity/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';


@Entity()
export class Theater {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  userId2: string

  // @ManyToOne(
  //   () => User,
  //   user => user.theater,
  // )
  // @JoinColumn()
  // user: Promise<User>;
  // @ManyToMany(()=> User)
  // @JoinTable({name:"theater_user"})
  // user:User[]

}
