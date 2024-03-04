import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class CurrencyEntity extends Model {
    private currencyCode: string;
    private name: string;
    private symbol: string;
}

CurrencyEntity.init({
    currencyCode: {type: DataTypes.STRING, primaryKey: true},
    name: DataTypes.STRING,
    symbol: DataTypes.STRING
}, {
    tableName: 'Currency',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});