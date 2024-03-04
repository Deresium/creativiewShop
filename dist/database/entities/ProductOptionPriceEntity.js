"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionPriceEntity extends sequelize_1.Model {
    getProductOptionPriceId() {
        return this.productOptionPriceId;
    }
    getProductOptionId() {
        return this.productOptionId;
    }
    getPrice() {
        return this.price;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
}
exports.default = ProductOptionPriceEntity;
ProductOptionPriceEntity.init({
    productOptionPriceId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    productOptionId: sequelize_1.DataTypes.BIGINT,
    price: sequelize_1.DataTypes.DECIMAL,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE
}, {
    tableName: 'ProductOptionPrice',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=ProductOptionPriceEntity.js.map