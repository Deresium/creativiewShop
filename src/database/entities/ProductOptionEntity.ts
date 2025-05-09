import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import ProductOptionPriceEntity from "./ProductOptionPriceEntity";
import ProductOptionPictureEntity from "./ProductOptionPictureEntity";
import ProductEntity from "./ProductEntity";
import ProductOptionDiscountEntity from "./ProductOptionDiscountEntity";
import ProductOptionCategoryEntity from "./ProductOptionCategoryEntity";
import Decimal from "decimal.js";

export default class ProductOptionEntity extends Model {
    private productOptionId: string;
    private productId: string;
    private product: ProductEntity;
    private nameFr: string;
    private nameEn: string;
    private code: string;
    private stock: number;
    private active: boolean;
    private featured: boolean;
    private click: string;
    private weight: string;
    private preorder: boolean;
    private deletedAt: Date;
    private createdAt: Date;

    private productOptionPrices: Array<ProductOptionPriceEntity>;
    private pictures: Array<ProductOptionPictureEntity>;
    private productOptionDiscounts: Array<ProductOptionDiscountEntity>;
    private productOptionCategories: Array<ProductOptionCategoryEntity>;

    public getProductOptionId() {
        return this.productOptionId;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getProduct(): ProductEntity {
        return this.product;
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

    public getWeight(): Decimal {
        if (!this.weight) {
            return null;
        }
        return new Decimal(this.weight);
    }

    public getPreorder(): boolean {
        return this.preorder;
    }

    public getListPrices() {
        return this.productOptionPrices;
    }

    public getListPictures() {
        return this.pictures;
    }


    public getProductOptionDiscounts(): Array<ProductOptionDiscountEntity> {
        return this.productOptionDiscounts;
    }

    public getProductOptionCategories() {
        return this.productOptionCategories;
    }


    public getDeletedAt(): Date {
        return this.deletedAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
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
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
}, {
    tableName: 'ProductOption',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

ProductOptionEntity.hasMany(ProductOptionPriceEntity, {
    sourceKey: 'productOptionId',
    foreignKey: 'productOptionId',
    as: 'productOptionPrices'
});

ProductOptionEntity.hasMany(ProductOptionPictureEntity, {
    sourceKey: 'productOptionId',
    foreignKey: 'productOptionId',
    as: 'pictures'
});

ProductOptionEntity.hasMany(ProductOptionCategoryEntity, {
    sourceKey: 'productOptionId',
    foreignKey: 'productOptionId',
    as: 'productOptionCategories'
});