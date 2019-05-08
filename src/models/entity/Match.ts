import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Match extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    team1: String

    @Column()
    team2: String

    @Column()
    date: Date

}