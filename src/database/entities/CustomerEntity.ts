import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CurrencyEntity from "./CurrencyEntity";

export default class CustomerEntity extends Model {
    private customerId: number;
    private name: string;
    private dnsName: string;
    private storeProtectionCode: boolean;
    private firstColor: string;
    private secondColor: string;
    private thirdColor: string;
    private emailFrom: string;
    private currency: CurrencyEntity;

    public getCustomerId(): number {
        return this.customerId;
    }

    public getName(): string {
        return this.name;
    }

    public getDnsName(): string {
        return this.dnsName;
    }

    public getStoreProtectionCode(): boolean {
        return this.storeProtectionCode;
    }


    public getFirstColor(): string {
        return this.firstColor;
    }

    public getSecondColor(): string {
        return this.secondColor;
    }

    public getThirdColor(): string {
        return this.thirdColor;
    }


    public getEmailFrom(): string {
        return this.emailFrom;
    }

    public getCurrency() {
        return this.currency;
    }
}

CustomerEntity.init({
    customerId: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    dnsName: DataTypes.STRING,
    storeProtectionCode: DataTypes.STRING,
    firstColor: DataTypes.STRING,
    secondColor: DataTypes.STRING,
    thirdColor: DataTypes.STRING,
    currencyCode: DataTypes.STRING,
    emailFrom: DataTypes.STRING
}, {
    tableName: 'Customer',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

CustomerEntity.hasOne(CurrencyEntity, {sourceKey: 'currencyCode', foreignKey: 'currencyCode', as: 'currency'});