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
const UserEntity_1 = __importDefault(require("../entities/UserEntity"));
class UserDataMapper {
    createUser(userCreationDS, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserEntity_1.default.create({
                email: userCreationDS.getEmail(),
                role: 'USER',
                password: hashPassword.getHashedPassword(),
                salted: hashPassword.getSalt(),
                access: false,
                name: userCreationDS.getName(),
                firstName: userCreationDS.getFirstName(),
                customerId: userCreationDS.getCustomerId()
            });
        });
    }
    findUserByEmailAndCustomer(email, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserEntity_1.default.findOne({
                where: {
                    email: email,
                    customerId: customerId
                }
            });
        });
    }
    findActiveUserOnEmail(email, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserEntity_1.default.findOne({
                where: {
                    email: email,
                    customerId: customerId,
                    access: true
                }
            });
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserEntity_1.default.findByPk(userId);
        });
    }
}
exports.default = UserDataMapper;
//# sourceMappingURL=UserDataMapper.js.map