"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class UserEntity extends sequelize_1.Model {
    getUserId() {
        return this.userId;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }
    getPassword() {
        return this.password;
    }
    getSalted() {
        return this.salted;
    }
    getAccess() {
        return this.access;
    }
    getName() {
        return this.name;
    }
    getFirstName() {
        return this.firstName;
    }
    getCustomerId() {
        return this.customerId;
    }
}
exports.default = UserEntity;
UserEntity.init({
    userId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    email: sequelize_1.DataTypes.STRING,
    role: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    salted: sequelize_1.DataTypes.STRING,
    access: sequelize_1.DataTypes.BOOLEAN,
    name: sequelize_1.DataTypes.STRING,
    firstName: sequelize_1.DataTypes.STRING,
    customerId: sequelize_1.DataTypes.INTEGER
}, {
    tableName: 'User',
    sequelize: DatabaseSingleton_1.default.getInstance().getSequelize()
});
//# sourceMappingURL=UserEntity.js.map