"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionCategoryEntity extends sequelize_1.Model {
    getProductOptionId() {
        return this.productOptionId;
    }
    getCategoryId() {
        return this.categoryId;
    }
}
exports.default = ProductOptionCategoryEntity;
ProductOptionCategoryEntity.init({
    categoryId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true },
    productOptionId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true }
}, {
    tableName: 'ProductOptionCategory',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=ProductOptionCategoryEntity.js.map