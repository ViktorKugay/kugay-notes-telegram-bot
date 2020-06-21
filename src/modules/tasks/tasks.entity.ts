import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Generated,
} from 'typeorm';
import {User} from '../users/users.entity';

@Entity({name: 'tasks'})
export class Task {
  @PrimaryGeneratedColumn({type: 'uuid'})
  @Generated('uuid')
  id!: string;

  @Column()
  content!: string;

  @Column({type: 'date', nullable: true})
  date!: string;

  @Column({type: 'time', nullable: true})
  time!: string;

  @Column({default: false})
  isResolved!: boolean;

  @ManyToOne(
    () => User,
    el => el.tasks,
  )
  user!: User;

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone'})
  updatedAt!: Date;
}
