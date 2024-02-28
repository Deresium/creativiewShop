import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionEntity extends Model {
    private productOptionId: string;
    private productId: string;
    private nameFr: string;
    private nameEn: string;
    private code: string;
    private stock: number;
    private active: boolean;
    private featured: boolean;
    private click: string;
    private weight: number;
    private preorder: boolean;
    private deletedAt: Date;
}

ProductOptionEntity.init({
    productOptionId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    productId: DataTypes.BIGINT,
    nameFr: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    code: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    featured: DataTypes.BOOLEAN,
    click: DataTypes.BIGINT,
    weight: DataTypes.DECIMAL,
    preorder: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'ProductOption',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});