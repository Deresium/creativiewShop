import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionDiscountEntity extends Model {
    private productOptionDiscountId: string;
    private productOptionId: string;
    private groupId: string;
    private percent: number;
    private minQuantity: number;
    private startDate: Date;
    private endDate: Date;
    private deletedAt: Date;


    getProductOptionDiscountId(): string {
        return this.productOptionDiscountId;
    }

    getProductOptionId(): string {
        return this.productOptionId;
    }

    getGroupId(): string {
        return this.groupId;
    }

    getPercent(): number {
        return this.percent;
    }

    getMinQuantity(): number {
        return this.minQuantity;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getDeletedAt(): Date {
        return this.deletedAt;
    }
}

ProductOptionDiscountEntity.init({
    productOptionDiscountId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    productOptionId: DataTypes.BIGINT,
    groupId: DataTypes.BIGINT,
    percent: DataTypes.DECIMAL,
    minQuantity: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'ProductOptionDiscount',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});