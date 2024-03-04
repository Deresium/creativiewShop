import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class CurrencyRateEntity extends Model {
    private currencyRateId: string;
    private currencyCode: string;
    private rate: number;
    private customerId: number;
    private startDate: Date;
    private endDate: Date;
}

CurrencyRateEntity.init({
    currencyRateId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    currencyCode: DataTypes.STRING,
    rate: DataTypes.DECIMAL,
    customerId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    tableName: 'CurrencyRate',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});