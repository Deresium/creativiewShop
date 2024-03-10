"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class GeographicZoneEntity extends sequelize_1.Model {
}
exports.default = GeographicZoneEntity;
GeographicZoneEntity.init({
    geographicZoneId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: sequelize_1.DataTypes.STRING,
    active: sequelize_1.DataTypes.BOOLEAN,
    customerId: sequelize_1.DataTypes.INTEGER,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    tableName: 'GeographicZone',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=GeographicZoneEntity.js.map