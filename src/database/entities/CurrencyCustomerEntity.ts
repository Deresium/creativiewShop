import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CurrencyEntity from "./CurrencyEntity";

export default class CurrencyCustomerEntity extends Model {
    private customerId: number;
    private currency: CurrencyEntity;


    getCustomerId(): number {
        return this.customerId;
    }

    getCurrency(): CurrencyEntity {
        return this.currency;
    }
}

CurrencyCustomerEntity.init({
    customerId: {type: DataTypes.INTEGER, primaryKey: true},
    currencyCode: {type: DataTypes.STRING, primaryKey: true}
},{
    tableName: 'CurrencyCustomer',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

CurrencyCustomerEntity.hasOne(CurrencyEntity, {sourceKey: 'currencyCode', foreignKey: 'currencyCode', as: 'currency'});