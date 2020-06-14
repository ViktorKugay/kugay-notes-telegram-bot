import {Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn, OneToMany} from 'typeorm';
import {Task} from '../tasks/tasks.entity';
import {Note} from '../notes/notes.entity';
import {Alias} from '../aliases/aliases.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryColumn()
  id!: number;

  @Column({nullable: true})
  firstName?: string;

  @Column({nullable: true})
  lastName?: string;

  @Column({nullable: true})
  username?: string;

  @OneToMany(
    () => Task,
    el => el.user,
  )
  tasks!: Task[];

  @OneToMany(
    () => Note,
    el => el.user,
  )
  notes!: Note[];

  @OneToMany(
    () => Alias,
    el => el.user,
  )
  aliases!: Alias[];

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone'})
  updatedAt!: Date;
}
