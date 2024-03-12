import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class WeightPriceEntity extends Model {
    private weightPriceId: string;
    private geographicZoneId: string;
    private gram: number;
    private price: number;
    private startDate: Date;
    private endDate: Date;


    getGram(): number {
        return this.gram;
    }

    getPrice(): number {
        return this.price;
    }

    getStartDate(): Date {
        return this.startDate;
    }
}

WeightPriceEntity.init({
    weightPriceId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    geographicZoneId: DataTypes.BIGINT,
    gram: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    tableName: 'WeightPrice',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});