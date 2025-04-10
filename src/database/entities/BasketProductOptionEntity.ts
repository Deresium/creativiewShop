import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import ProductOptionEntity from "./ProductOptionEntity";
import Decimal from "decimal.js";

export default class BasketProductOptionEntity extends Model {
    private readonly basketId: string;
    private readonly productOptionId: string;
    private readonly quantity: number;
    private readonly priceAtOrdered: string;

    private readonly productOption: ProductOptionEntity;

    getProductOptionId(): string {
        return this.productOptionId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getProductOption() {
        return this.productOption;
    }


    getPriceAtOrdered(): Decimal {
        if(this.priceAtOrdered) {
            return new Decimal(this.priceAtOrdered);
        }
        return null;
    }
}

BasketProductOptionEntity.init({
    basketId: {type: DataTypes.BIGINT, primaryKey: true},
    productOptionId: {type: DataTypes.BIGINT, primaryKey: true},
    quantity: DataTypes.INTEGER,
    priceAtOrdered: DataTypes.DECIMAL
}, {
    tableName: 'BasketProductOption',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

BasketProductOptionEntity.hasOne(ProductOptionEntity, {
    sourceKey: 'productOptionId',
    foreignKey: 'productOptionId',
    as: 'productOption'
});