import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Match } from './Match';

@Entity()
export class Update extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public date: Date;

  @Column()
  public scorePrincipal: number;

  @Column()
  public scoreVisitor: number;

  @Column('simple-json')
  public action: { text: string; type: string };

  @ManyToOne((): any => Match)
  public match: Match;
}
