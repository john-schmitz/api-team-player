import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public nameOrganization: string;

  @Column()
  public password: string;

  @Column('simple-array', { nullable: true })
  public matchesId: number[];
}
