"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
const UserEntity_1 = __importDefault(require("./UserEntity"));
class UserGroupEntity extends sequelize_1.Model {
    getGroupId() {
        return this.groupId;
    }
}
exports.default = UserGroupEntity;
UserGroupEntity.init({
    userGroupId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    groupId: sequelize_1.DataTypes.BIGINT,
    userId: sequelize_1.DataTypes.BIGINT,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE
}, {
    tableName: 'UserGroup',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
UserGroupEntity.hasOne(UserEntity_1.default, { sourceKey: 'userId', foreignKey: 'userId' });
//# sourceMappingURL=UserGroupEntity.js.map