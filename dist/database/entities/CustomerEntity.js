"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class CustomerEntity extends sequelize_1.Model {
    getCustomerId() {
        return this.customerId;
    }
    getName() {
        return this.name;
    }
    getDnsName() {
        return this.dnsName;
    }
    getStoreProtectionCode() {
        return this.storeProtectionCode;
    }
    getFirstColor() {
        return this.firstColor;
    }
    getSecondColor() {
        return this.secondColor;
    }
    getThirdColor() {
        return this.thirdColor;
    }
}
exports.default = CustomerEntity;
CustomerEntity.init({
    customerId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    name: sequelize_1.DataTypes.STRING,
    dnsName: sequelize_1.DataTypes.STRING,
    storeProtectionCode: sequelize_1.DataTypes.STRING,
    firstColor: sequelize_1.DataTypes.STRING,
    secondColor: sequelize_1.DataTypes.STRING,
    thirdColor: sequelize_1.DataTypes.STRING
}, {
    tableName: 'Customer',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=CustomerEntity.js.map