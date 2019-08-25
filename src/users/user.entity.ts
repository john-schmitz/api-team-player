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
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Match } from '../matches/match.entity';
import { Competition } from '../competitions/competition.entity';
import { Event } from '../events/event.entity';
import { Organization } from '../organizations/organization.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public image_url: string;

  @Exclude()
  @Column()
  public password: string;

  @OneToOne(type => Organization, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  public organization: Organization;

  @ManyToMany(type => Match)
  @JoinTable()
  public matches: Match[];

  @ManyToMany(type => Competition)
  @JoinTable()
  public competitions: Competition[];

  @ManyToMany(type => Event)
  @JoinTable()
  public events: Event[];

  @Exclude()
  @CreateDateColumn()
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt: Date;
}
