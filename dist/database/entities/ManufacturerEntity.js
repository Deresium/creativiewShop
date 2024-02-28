"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ManufacturerEntity extends sequelize_1.Model {
    getManufacturerId() {
        return this.manufacturerId;
    }
    getName() {
        return this.name;
    }
}
exports.default = ManufacturerEntity;
ManufacturerEntity.init({
    manufacturerId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: sequelize_1.DataTypes.STRING,
    customerId: sequelize_1.DataTypes.INTEGER,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'Manufacturer',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=ManufacturerEntity.js.map