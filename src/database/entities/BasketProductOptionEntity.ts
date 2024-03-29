import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class BasketProductOptionEntity extends Model {
    private readonly basketId: string;
    private readonly productOptionId: string;
    private readonly quantity: number;


    getProductOptionId(): string {
        return this.productOptionId;
    }

    getQuantity(): number {
        return this.quantity;
    }
}

BasketProductOptionEntity.init({
    basketId: {type: DataTypes.BIGINT, primaryKey: true},
    productOptionId: {type: DataTypes.BIGINT, primaryKey: true},
    quantity: DataTypes.INTEGER
},{
    tableName: 'BasketProductOption',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});