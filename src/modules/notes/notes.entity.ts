import {Entity, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, Generated, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/users.entity';

@Entity({name: 'notes'})
export class Note {
  @PrimaryGeneratedColumn({type: 'uuid'})
  @Generated('uuid')
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(
    () => User,
    el => el.notes,
  )
  user!: User;

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone'})
  updatedAt!: Date;
}
