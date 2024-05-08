import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import ManufacturerEntity from "./ManufacturerEntity";
import ProductOptionEntity from "./ProductOptionEntity";

export default class ProductEntity extends Model {
    private productId: string;
    private customerId: number;
    private manufacturer: ManufacturerEntity;
    private manufacturerId: string;
    private code: string;
    private nameFr: string;
    private nameEn: string;
    private descriptionFr: string;
    private descriptionEn: string;
    private deletedAt: Date;
    private productOptions: Array<ProductOptionEntity>;


    public getProductId(): string {
        return this.productId;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public getManufacturerId(): string {
        return this.manufacturerId;
    }

    public getManufacturerName(): string {
        if (this.manufacturer) {
            return this.manufacturer.getName();
        }
        return null
    }

    public getCode(): string {
        return this.code;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getDescriptionFr(): string {
        return this.descriptionFr;
    }

    public getDescriptionEn(): string {
        return this.descriptionEn;
    }

    public getProductOptions() {
        return this.productOptions;
    }

    public getDeletedAt() {
        return this.deletedAt;
    }
}

ProductEntity.init({
    productId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    customerId: DataTypes.INTEGER,
    manufacturerId: DataTypes.STRING,
    code: DataTypes.STRING,
    nameFr: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    descriptionFr: DataTypes.TEXT,
    descriptionEn: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'Product',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

ProductEntity.hasOne(ManufacturerEntity, {
    sourceKey: 'manufacturerId',
    foreignKey: 'manufacturerId',
    as: 'manufacturer'
});

ProductEntity.hasMany(ProductOptionEntity, {
    sourceKey: 'productId',
    foreignKey: 'productId',
    as: 'productOptions'
});

ProductOptionEntity.hasOne(ProductEntity, {
    sourceKey: 'productId',
    foreignKey: 'productId',
    as: 'product'
});