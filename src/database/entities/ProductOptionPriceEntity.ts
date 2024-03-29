import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionPriceEntity extends Model {
    private productOptionPriceId: string;
    private productOptionId: string;
    private price: number;
    private startDate: Date;
    private endDate: Date;


    public getProductOptionPriceId(): string {
        return this.productOptionPriceId;
    }

    public getProductOptionId(): string {
        return this.productOptionId;
    }

    public getPrice(): number {
        return this.price;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }
}

ProductOptionPriceEntity.init({
    productOptionPriceId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    productOptionId: DataTypes.BIGINT,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    tableName: 'ProductOptionPrice',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});