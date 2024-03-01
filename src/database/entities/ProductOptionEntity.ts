import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import ProductEntity from "./ProductEntity";

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

    public getProductOptionId() {
        return this.productOptionId;
    }


    public getProductId(): string {
        return this.productId;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getCode(): string {
        return this.code;
    }

    public getStock(): number {
        return this.stock;
    }

    public getActive(): boolean {
        return this.active;
    }

    public getFeatured(): boolean {
        return this.featured;
    }

    public getClick(): string {
        return this.click;
    }

    public getWeight(): number {
        return this.weight;
    }

    public getPreorder(): boolean {
        return this.preorder;
    }
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

ProductOptionEntity.hasOne(ProductEntity, {sourceKey: 'productId', foreignKey: 'productId'});