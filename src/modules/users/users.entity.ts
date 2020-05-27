import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  Column,
} from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn({type: 'uuid'})
  @Generated('uuid')
  id!: string;

  @Column({unique: true})
  login!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt!: Date;

  @UpdateDateColumn({type: 'timestamp with time zone'})
  updatedAt!: Date;
}
