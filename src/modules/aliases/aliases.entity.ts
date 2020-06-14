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
import {TelegrafScene} from '../telegram/telegram.types';

@Entity({name: 'aliases'})
export class Alias {
  @PrimaryGeneratedColumn({type: 'uuid'})
  @Generated('uuid')
  id!: string;

  @Column({nullable: true})
  alias!: string;

  @Column({enum: TelegrafScene})
  scene!: TelegrafScene;

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
