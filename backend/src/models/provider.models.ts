import { Table ,Model, Column,DataType} from "sequelize-typescript";
interface ProviderCreationAttributes {
    providerId: number;
    providerName: string;
    providerBalance: number;
}

@Table
export class Provider extends Model<Provider,ProviderCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    providerId!: number;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    providerName!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    providerBalance!: number;
}