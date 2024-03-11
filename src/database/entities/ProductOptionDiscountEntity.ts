import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import ProductOptionEntity from "./ProductOptionEntity";
import GroupEntity from "./GroupEntity";

export default class ProductOptionDiscountEntity extends Model {
    private productOptionDiscountId: string;
    private productOption: ProductOptionEntity;
    private group: GroupEntity;
    private percent: number;
    private minQuantity: number;
    private startDate: Date;
    private endDate: Date;
    private deletedAt: Date;


    getProductOptionDiscountId(): string {
        return this.productOptionDiscountId;
    }

    getProductOptionId(): string {
        if(this.productOption) {
            return this.productOption.getProductOptionId();
        }
        return null;
    }

    getProductOption() {
        return this.productOption;
    }

    getGroupId(): string {
        if(this.group){
            return this.group.getGroupId();
        }
        return null;
    }

    getGroup(){
        return this.group;
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

ProductOptionDiscountEntity.hasOne(ProductOptionEntity, {
    sourceKey: 'productOptionId',
    foreignKey: 'productOptionId',
    as: 'productOption'
});

ProductOptionDiscountEntity.hasOne(GroupEntity, {
    sourceKey: 'groupId',
    foreignKey: 'groupId',
    as: 'group'
});