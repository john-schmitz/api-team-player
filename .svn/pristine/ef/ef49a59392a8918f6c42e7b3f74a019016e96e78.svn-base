import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Match } from '../matches/match.entity';

@Entity()
export class Update {
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
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
