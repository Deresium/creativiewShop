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
const PasswordHasher_1 = __importDefault(require("../utils/PasswordHasher"));
const UserLoginVM_1 = __importDefault(require("../models/viewmodels/UserLoginVM"));
const UserVM_1 = __importDefault(require("../models/viewmodels/UserVM"));
class UserFacade {
    constructor(userDataGateway) {
        this.userDataGateway = userDataGateway;
    }
    createUser(userCreationDS) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userCreationDS.getPassword() !== userCreationDS.getRepeatPassword()) {
                throw new Error('error.noMatchPassword');
            }
            const user = yield this.userDataGateway.findUserByEmailAndCustomer(userCreationDS.getEmail(), userCreationDS.getCustomerId());
            if (user) {
                throw new Error('createAccount.alreadyExists');
            }
            const passwordHashDS = yield PasswordHasher_1.default.hashPassword(userCreationDS.getPassword());
            yield this.userDataGateway.createUser(userCreationDS, passwordHashDS);
        });
    }
    loginUser(loginInfoDS) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDataGateway.findActiveUserOnEmail(loginInfoDS.getEmail(), loginInfoDS.getCustomerId());
            if (!user) {
                return null;
            }
            const passwordHashed = yield PasswordHasher_1.default.hashPassword(loginInfoDS.getPassword(), user.getSalted());
            if (passwordHashed.getHashedPassword() === user.getPassword()) {
                return new UserLoginVM_1.default(user.getUserId(), user.getRole());
            }
            return null;
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = yield this.userDataGateway.findUserById(userId);
            return new UserVM_1.default(userEntity.getName(), userEntity.getFirstName(), userEntity.getEmail(), userEntity.getRole() === 'ADMIN', true);
        });
    }
}
exports.default = UserFacade;
//# sourceMappingURL=UserFacade.js.map