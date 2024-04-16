import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import Decimal from "decimal.js";

export default class WeightPriceEntity extends Model {
    private weightPriceId: string;
    private deliveryOptionId: string;
    private gram: string;
    private price: string;
    private startDate: Date;
    private endDate: Date;


    getGram(): Decimal {
        return new Decimal(this.gram);
    }

    getPrice(): Decimal {
        return new Decimal(this.price);
    }

    getStartDate(): Date {
        return this.startDate;
    }
}

WeightPriceEntity.init({
    weightPriceId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    deliveryOptionId: DataTypes.BIGINT,
    gram: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    tableName: 'WeightPrice',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});