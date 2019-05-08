import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    nome: String

    @Column()
    email: String

    @Column()
    nomeOrganizacao: String
}