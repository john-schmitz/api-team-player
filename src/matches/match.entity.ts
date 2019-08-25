import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Competition } from '../competitions/competition.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public namePrincipal: string;

  @Column()
  public nameVisitor: string;

  @Column()
  public place: string;

  @Column()
  public date: Date;

  @ManyToOne(type => Competition, competition => competition.matches)
  public competition: Competition;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
