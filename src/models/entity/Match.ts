/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Competition } from './Competition';

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public namePrincipal: string;

  @Column()
  public nameVisitor: string;

  @Column()
  public modality: string;

  @Column()
  public place: string;

  @Column()
  public date: Date;

  @ManyToOne(type => Competition, competition => competition.matches)
  public competition: Competition;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
