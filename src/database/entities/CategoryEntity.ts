import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class CategoryEntity extends Model {
    private categoryId: string;
    private customerId: number;
    private parentCategoryId: string;
    private nameFr: string;
    private nameEn: string;
    private imageName: string;
    private deletedAt: Date;

    public getCategoryId() {
        return this.categoryId;
    }


    public getParentCategoryId(): string {
        return this.parentCategoryId;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getImageName(): string {
        return this.imageName;
    }
}

CategoryEntity.init({
    categoryId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    customerId: DataTypes.INTEGER,
    parentCategoryId: DataTypes.BIGINT,
    nameFr: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    imageName: DataTypes.STRING,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'Category',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});