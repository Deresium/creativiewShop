import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionCategoryEntity extends Model {
    private categoryId: string;
    private productOptionId: string;


    public getProductOptionId(): string {
        return this.productOptionId;
    }


    getCategoryId(): string {
        return this.categoryId;
    }
}

ProductOptionCategoryEntity.init({
    categoryId: {type: DataTypes.BIGINT, primaryKey: true},
    productOptionId: {type: DataTypes.BIGINT, primaryKey: true}
}, {
    tableName: 'ProductOptionCategory',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});