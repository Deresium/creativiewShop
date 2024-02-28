import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionPriceEntity extends Model {
    private productOptionPriceId: string;
    private productOptionId: string;
    private price: number;
    private startDate: Date;
    private endDate: Date;
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