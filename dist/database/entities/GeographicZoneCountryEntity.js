"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class GeographicZoneCountryEntity extends sequelize_1.Model {
}
exports.default = GeographicZoneCountryEntity;
GeographicZoneCountryEntity.init({
    geographicZoneId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true },
    countryId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true }
}, {
    tableName: 'GeographicZoneCountry',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=GeographicZoneCountryEntity.js.map