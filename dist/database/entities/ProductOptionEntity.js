"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
const ProductEntity_1 = __importDefault(require("./ProductEntity"));
class ProductOptionEntity extends sequelize_1.Model {
    getProductOptionId() {
        return this.productOptionId;
    }
    getProductId() {
        return this.productId;
    }
    getNameFr() {
        return this.nameFr;
    }
    getNameEn() {
        return this.nameEn;
    }
    getCode() {
        return this.code;
    }
    getStock() {
        return this.stock;
    }
    getActive() {
        return this.active;
    }
    getFeatured() {
        return this.featured;
    }
    getClick() {
        return this.click;
    }
    getWeight() {
        return this.weight;
    }
    getPreorder() {
        return this.preorder;
    }
}
exports.default = ProductOptionEntity;
ProductOptionEntity.init({
    productOptionId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    productId: sequelize_1.DataTypes.BIGINT,
    nameFr: sequelize_1.DataTypes.STRING,
    nameEn: sequelize_1.DataTypes.STRING,
    code: sequelize_1.DataTypes.STRING,
    stock: sequelize_1.DataTypes.INTEGER,
    active: sequelize_1.DataTypes.BOOLEAN,
    featured: sequelize_1.DataTypes.BOOLEAN,
    click: sequelize_1.DataTypes.BIGINT,
    weight: sequelize_1.DataTypes.DECIMAL,
    preorder: sequelize_1.DataTypes.BOOLEAN,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'ProductOption',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
ProductOptionEntity.hasOne(ProductEntity_1.default, { sourceKey: 'productId', foreignKey: 'productId' });
//# sourceMappingURL=ProductOptionEntity.js.map