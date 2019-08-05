import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Event } from '../events/event.entity';
import { Match } from '../matches/match.entity';
import { Organization } from '../organizations/organization.entity';

@Entity()
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public modality: string;

  @ManyToOne(type => Event, event => event.competitions)
  public event: Event;

  @ManyToOne(type => Organization, organization => organization.competitions)
  public organization: Organization;

  @OneToMany(type => Match, match => match.competition)
  public matches: Match[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
