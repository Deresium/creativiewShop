import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CurrencyEntity from "./CurrencyEntity";

export default class CustomerEntity extends Model {
    private customerId: number;
    private name: string;
    private dnsName: string;
    private storeProtectionCode: string;
    private firstColor: string;
    private secondColor: string;
    private thirdColor: string;
    private emailFrom: string;
    private defaultBankCustomerId: string;
    private currencyCode: string;
    private orderCounter: string;
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

    public getStoreProtectionCode(): string {
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


    public getCurrencyCode(): string {
        return this.currencyCode;
    }

    public getCurrency() {
        return this.currency;
    }


    public getDefaultBankCustomerId(): string {
        return this.defaultBankCustomerId;
    }


    public getOrderCounter(): bigint {
        if (this.orderCounter) {
            return BigInt(this.orderCounter);
        }
        return null;
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
    emailFrom: DataTypes.STRING,
    defaultBankCustomerId: DataTypes.BIGINT,
    orderCounter: DataTypes.BIGINT
}, {
    tableName: 'Customer',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

CustomerEntity.hasOne(CurrencyEntity, {sourceKey: 'currencyCode', foreignKey: 'currencyCode', as: 'currency'});