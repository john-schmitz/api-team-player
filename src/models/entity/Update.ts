/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Match } from './Match';

@Entity()
export class Update extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public date: Date;

  @Column()
  public scorePrincipal: number;

  @Column()
  public scoreVisitor: number;

  @Column('simple-json')
  public action: { text: string; type: string };

  @ManyToOne(() => Match)
  public match: Match;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
