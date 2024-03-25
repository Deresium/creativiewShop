import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class BasketProductOptionEntity extends Model {
    private readonly basketId: string;
    private readonly productOptionId: string;
    private readonly quantity: number;
}

BasketProductOptionEntity.init({
    basketId: {type: DataTypes.STRING, primaryKey: true},
    productOptionId: {type: DataTypes.STRING, primaryKey: true},
    quantity: DataTypes.INTEGER
},{
    tableName: 'BasketProductOption',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});