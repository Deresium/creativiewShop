"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
const ProductOptionEntity_1 = __importDefault(require("./ProductOptionEntity"));
const GroupEntity_1 = __importDefault(require("./GroupEntity"));
class ProductOptionDiscountEntity extends sequelize_1.Model {
    getProductOptionDiscountId() {
        return this.productOptionDiscountId;
    }
    getProductOptionId() {
        if (this.productOption) {
            return this.productOption.getProductOptionId();
        }
        return null;
    }
    getProductOption() {
        return this.productOption;
    }
    getGroupId() {
        if (this.group) {
            return this.group.getGroupId();
        }
        return null;
    }
    getGroup() {
        return this.group;
    }
    getPercent() {
        return this.percent;
    }
    getMinQuantity() {
        return this.minQuantity;
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
    minQuantity: sequelize_1.DataTypes.INTEGER,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'ProductOptionDiscount',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
ProductOptionDiscountEntity.hasOne(ProductOptionEntity_1.default, {
    sourceKey: 'productOptionId',
    foreignKey: 'productOptionId',
    as: 'productOption'
});
ProductOptionDiscountEntity.hasOne(GroupEntity_1.default, {
    sourceKey: 'groupId',
    foreignKey: 'groupId',
    as: 'group'
});
//# sourceMappingURL=ProductOptionDiscountEntity.js.map