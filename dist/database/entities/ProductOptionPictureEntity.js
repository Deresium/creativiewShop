"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionPictureEntity extends sequelize_1.Model {
    getProductOptionPictureId() {
        return this.productOptionPictureId;
    }
    getProductOptionId() {
        return this.productOptionId;
    }
    getName() {
        return this.name;
    }
}
exports.default = ProductOptionPictureEntity;
ProductOptionPictureEntity.init({
    productOptionPictureId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    productOptionId: sequelize_1.DataTypes.BIGINT,
    name: sequelize_1.DataTypes.STRING
}, {
    tableName: 'ProductOptionPicture',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=ProductOptionPictureEntity.js.map