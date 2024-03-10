"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class GroupEntity extends sequelize_1.Model {
    getGroupId() {
        return this.groupId;
    }
    getName() {
        return this.name;
    }
    getGroupCategoryCode() {
        return this.groupCategoryCode;
    }
    getCustomerId() {
        return this.customerId;
    }
}
exports.default = GroupEntity;
GroupEntity.init({
    groupId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: sequelize_1.DataTypes.STRING,
    groupCategoryCode: sequelize_1.DataTypes.STRING,
    customerId: sequelize_1.DataTypes.INTEGER
}, {
    tableName: 'Group',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=GroupEntity.js.map