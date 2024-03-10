"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class CountryEntity extends sequelize_1.Model {
}
exports.default = CountryEntity;
CountryEntity.init({
    countryId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameFr: sequelize_1.DataTypes.STRING,
    nameEn: sequelize_1.DataTypes.STRING
}, {
    tableName: 'Country',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=CountryEntity.js.map