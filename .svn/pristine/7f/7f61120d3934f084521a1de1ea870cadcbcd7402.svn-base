import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Competition } from '../competitions/competition.entity';
import { Organization } from '../organizations/organization.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public image: string;

  @Column()
  public place: string;

  @OneToMany(type => Competition, competition => competition.event)
  public competitions: Competition[];

  @ManyToOne(type => Organization, organization => organization.events)
  public organization: Organization;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
