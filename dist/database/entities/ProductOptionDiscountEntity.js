"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionDiscountEntity extends sequelize_1.Model {
    getProductOptionDiscountId() {
        return this.productOptionDiscountId;
    }
    getProductOptionId() {
        return this.productOptionId;
    }
    getGroupId() {
        return this.groupId;
    }
    getPercent() {
        return this.percent;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getDeletedAt() {
        return this.deletedAt;
    }
}
exports.default = ProductOptionDiscountEntity;
ProductOptionDiscountEntity.init({
    productOptionDiscountId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    productOptionId: sequelize_1.DataTypes.BIGINT,
    groupId: sequelize_1.DataTypes.BIGINT,
    percent: sequelize_1.DataTypes.DECIMAL,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'ProductOptionDiscount',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=ProductOptionDiscountEntity.js.map