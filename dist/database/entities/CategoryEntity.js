"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class CategoryEntity extends sequelize_1.Model {
    getCategoryId() {
        return this.categoryId;
    }
    getParentCategoryId() {
        return this.parentCategoryId;
    }
    getNameFr() {
        return this.nameFr;
    }
    getNameEn() {
        return this.nameEn;
    }
    getImageName() {
        return this.imageName;
    }
}
exports.default = CategoryEntity;
CategoryEntity.init({
    categoryId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    customerId: sequelize_1.DataTypes.INTEGER,
    parentCategoryId: sequelize_1.DataTypes.BIGINT,
    nameFr: sequelize_1.DataTypes.STRING,
    nameEn: sequelize_1.DataTypes.STRING,
    imageName: sequelize_1.DataTypes.STRING,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'Category',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=CategoryEntity.js.map