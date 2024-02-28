import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ManufacturerEntity extends Model {
    private manufacturerId: string;
    private name: string;
    private customerId: number;
    private deletedAt: Date;


    public getManufacturerId(): string {
        return this.manufacturerId;
    }

    public getName(): string {
        return this.name;
    }
}

ManufacturerEntity.init({
        manufacturerId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        customerId: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE
    }, {
        tableName: 'Manufacturer',
        sequelize: DatabaseSingleton.getInstance().getSequelize()
    }
);