import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.models';

interface PromoCodeCreationAttributes {
    code: string;
    cashbackAmount: number;
    maxUsesPerUser: number;
}
@Table
export class PromoCode extends Model<PromoCode,PromoCodeCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    promoCodeId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    code!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cashbackAmount!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxUsesPerUser!: number;
}



@Table
export class Usage extends Model<Usage> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    usageId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @ForeignKey(() => PromoCode)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    promoCodeId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    uses!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cashbackEarned!: number;
}
