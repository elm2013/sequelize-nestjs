import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class User extends Model {

    @Column
    firstName: string;

    @Column
    lastName: string;



    @Column({
        unique: true,
    })
    mobile: string;

    @Column
    password: string;
}