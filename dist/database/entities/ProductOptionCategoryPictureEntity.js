"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionCategoryPictureEntity extends sequelize_1.Model {
}
exports.default = ProductOptionCategoryPictureEntity;
ProductOptionCategoryPictureEntity.init({
    productOptionPictureId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    productOptionId: sequelize_1.DataTypes.BIGINT,
    name: sequelize_1.DataTypes.STRING
}, {
    tableName: 'ProductOptionCategoryPicture',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=ProductOptionCategoryPictureEntity.js.map