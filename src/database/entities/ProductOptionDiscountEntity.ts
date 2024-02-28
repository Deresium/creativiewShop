import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionDiscountEntity extends Model {
    private productOptionDiscountId: string;
    private productOptionId: string;
    private groupId: string;
    private percent: number;
    private startDate: Date;
    private endDate: Date;
}

ProductOptionDiscountEntity.init({
    productOptionDiscountId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    productOptionId: DataTypes.BIGINT,
    groupId: DataTypes.BIGINT,
    percent: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    tableName: 'ProductOptionDiscount',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});