"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class InternalizationEntity extends sequelize_1.Model {
    getInternalizationKey() {
        return this.internalizationKey;
    }
    getTextFR() {
        return this.textFR;
    }
    getTextEN() {
        return this.textEN;
    }
    getCustomerId() {
        return this.customerId;
    }
}
exports.default = InternalizationEntity;
InternalizationEntity.init({
    internalizationId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true },
    internalizationKey: sequelize_1.DataTypes.STRING,
    textFR: sequelize_1.DataTypes.STRING,
    textEN: sequelize_1.DataTypes.STRING,
    customerId: sequelize_1.DataTypes.INTEGER
}, {
    tableName: 'Internalization',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=InternalizationEntity.js.map