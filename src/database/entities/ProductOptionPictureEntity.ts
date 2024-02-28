import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionPictureEntity extends Model {
    private productOptionPictureId: string;
    private productOptionId: string;
    private name: string;
}

ProductOptionPictureEntity.init({
    productOptionPictureId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    productOptionId: DataTypes.BIGINT,
    name: DataTypes.STRING
}, {
    tableName: 'ProductOptionPicture',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});