import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductEntity extends Model {
    private productId: string;
    private customerId: number;
    private manufacturerId: string;
    private code: string;
    private nameFr: string;
    private nameEn: string;
    private descriptionFr: string;
    private descriptionEn: string;
    private deletedAt: Date;
}

ProductEntity.init({
    productId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    customerId: DataTypes.INTEGER,
    manufacturerId: DataTypes.STRING,
    code: DataTypes.STRING,
    nameFr: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    descriptionFr: DataTypes.STRING,
    descriptionEn: DataTypes.STRING,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'Product',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});