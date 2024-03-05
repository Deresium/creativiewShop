import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class CurrencyRateEntity extends Model {
    private currencyRateId: string;
    private currencyCode: string;
    private rate: number;
    private customerId: number;
    private startDate: Date;
    private endDate: Date;


    getCurrencyCode(): string {
        return this.currencyCode;
    }

    getRate(): number {
        return this.rate;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }
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