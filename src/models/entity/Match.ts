import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public team1: string;

  @Column()
  public team2: string;

  @Column()
  public date: Date;
}
