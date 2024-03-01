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


    public getProductId(): string {
        return this.productId;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public getManufacturerId(): string {
        return this.manufacturerId;
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