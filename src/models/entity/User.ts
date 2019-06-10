/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Match } from './Match';
import { Competition } from './Competition';
import { Event } from './Event';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public nameOrganization: string;

  @Column()
  public password: string;

  @Column('simple-array', { nullable: true })
  public matchesId: string[];

  @ManyToMany(type => Match)
  @JoinTable()
  public matches: Match[];

  @ManyToMany(type => Competition)
  @JoinTable()
  public competitions: Competition[];

  @ManyToMany(type => Event)
  @JoinTable()
  public events: Event[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
