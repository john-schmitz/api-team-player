import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

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
}
