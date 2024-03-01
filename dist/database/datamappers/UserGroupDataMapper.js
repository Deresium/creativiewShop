"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserGroupEntity_1 = __importDefault(require("../entities/UserGroupEntity"));
const sequelize_1 = require("sequelize");
const UserEntity_1 = __importDefault(require("../entities/UserEntity"));
class UserGroupDataMapper {
    getAllGroupsForUser(userId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            return yield UserGroupEntity_1.default.findAll({
                where: {
                    userId: userId,
                    startDate: { [sequelize_1.Op.lte]: date },
                    [sequelize_1.Op.or]: [
                        { endDate: { [sequelize_1.Op.gte]: date } },
                        { endDate: { [sequelize_1.Op.is]: null } }
                    ]
                },
                include: [{ model: UserEntity_1.default, where: { customerId: customerId } }]
            });
        });
    }
}
exports.default = UserGroupDataMapper;
//# sourceMappingURL=UserGroupDataMapper.js.map