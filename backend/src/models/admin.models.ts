import { Table, Column, Model, DataType } from 'sequelize-typescript';


interface AdminCreationAttributes {
    adminId: number;
    username: string;
    password: string;
}
@Table
export class Admin extends Model<Admin, AdminCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    adminId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;
}