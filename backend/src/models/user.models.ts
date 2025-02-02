import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';
// Create the UserCreationAttributes type
interface UserCreationAttributes {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    balance: number;
}

@Table
export class User extends Model<User,UserCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phoneNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    balance!: number;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;
}
