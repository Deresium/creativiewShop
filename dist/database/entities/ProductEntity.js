"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
const ManufacturerEntity_1 = __importDefault(require("./ManufacturerEntity"));
class ProductEntity extends sequelize_1.Model {
    getProductId() {
        return this.productId;
    }
    getCustomerId() {
        return this.customerId;
    }
    getManufacturerId() {
        if (this.manufacturer) {
            return this.manufacturer.getManufacturerId();
        }
        return null;
    }
    getManufacturerName() {
        if (this.manufacturer) {
            return this.manufacturer.getName();
        }
        return null;
    }
    getCode() {
        return this.code;
    }
    getNameFr() {
        return this.nameFr;
    }
    getNameEn() {
        return this.nameEn;
    }
    getDescriptionFr() {
        return this.descriptionFr;
    }
    getDescriptionEn() {
        return this.descriptionEn;
    }
}
exports.default = ProductEntity;
ProductEntity.init({
    productId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    customerId: sequelize_1.DataTypes.INTEGER,
    manufacturerId: sequelize_1.DataTypes.STRING,
    code: sequelize_1.DataTypes.STRING,
    nameFr: sequelize_1.DataTypes.STRING,
    nameEn: sequelize_1.DataTypes.STRING,
    descriptionFr: sequelize_1.DataTypes.STRING,
    descriptionEn: sequelize_1.DataTypes.STRING,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'Product',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
ProductEntity.hasOne(ManufacturerEntity_1.default, {
    sourceKey: 'manufacturerId',
    foreignKey: 'manufacturerId',
    as: 'manufacturer'
});
//# sourceMappingURL=ProductEntity.js.map