"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class WeightPriceEntity extends sequelize_1.Model {
}
exports.default = WeightPriceEntity;
WeightPriceEntity.init({
    weightPriceId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    geographicZoneId: sequelize_1.DataTypes.BIGINT,
    gram: sequelize_1.DataTypes.DECIMAL,
    price: sequelize_1.DataTypes.DECIMAL,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE
}, {
    tableName: 'WeightPrice',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=WeightPriceEntity.js.map