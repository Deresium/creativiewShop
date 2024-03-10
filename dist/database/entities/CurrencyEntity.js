"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class CurrencyEntity extends sequelize_1.Model {
    getCurrencyCode() {
        return this.currencyCode;
    }
    getName() {
        return this.name;
    }
    getSymbol() {
        return this.symbol;
    }
}
exports.default = CurrencyEntity;
CurrencyEntity.init({
    currencyCode: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    name: sequelize_1.DataTypes.STRING,
    symbol: sequelize_1.DataTypes.STRING
}, {
    tableName: 'Currency',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=CurrencyEntity.js.map