"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class CurrencyRateEntity extends sequelize_1.Model {
    getCurrencyRateId() {
        return this.currencyRateId;
    }
    getCurrencyCode() {
        return this.currencyCode;
    }
    getRate() {
        return this.rate;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
}
exports.default = CurrencyRateEntity;
CurrencyRateEntity.init({
    currencyRateId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    currencyCode: sequelize_1.DataTypes.STRING,
    rate: sequelize_1.DataTypes.DECIMAL,
    customerId: sequelize_1.DataTypes.INTEGER,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE
}, {
    tableName: 'CurrencyRate',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=CurrencyRateEntity.js.map