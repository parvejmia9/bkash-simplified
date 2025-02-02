import { Table, Column, Model, DataType, ForeignKey, CreatedAt } from 'sequelize-typescript';
import { User } from './user.models';
interface TransactionCreationAttributes {
    transactionId: number;
    senderId: number;
    type: 'transfer' | 'bill_payment';
    amount: number;
    recipientId: number;
    paymentDate: Date;
}
@Table
export class Transaction extends Model<Transaction, TransactionCreationAttributes> { 
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    transactionId!: number;
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    senderId!: number;

    @Column({
        type: DataType.ENUM('transfer', 'bill_payment'),
        allowNull: false,
    })
    type!: 'transfer' | 'bill_payment';

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    recipientId!: number;


    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    paymentDate!: Date;
}