"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
const CurrencyEntity_1 = __importDefault(require("./CurrencyEntity"));
class CurrencyCustomerEntity extends sequelize_1.Model {
    getCustomerId() {
        return this.customerId;
    }
    getCurrency() {
        return this.currency;
    }
}
exports.default = CurrencyCustomerEntity;
CurrencyCustomerEntity.init({
    customerId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    currencyCode: { type: sequelize_1.DataTypes.STRING, primaryKey: true }
}, {
    tableName: 'CurrencyCustomer',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
CurrencyCustomerEntity.hasOne(CurrencyEntity_1.default, { sourceKey: 'currencyCode', foreignKey: 'currencyCode', as: 'currency' });
//# sourceMappingURL=CurrencyCustomerEntity.js.map