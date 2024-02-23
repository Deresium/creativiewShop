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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PasswordHashDS_1 = __importDefault(require("../models/datastores/PasswordHashDS"));
class PasswordHasher {
    static hashPassword(passwordNoHash, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            let localSalt;
            if (salt) {
                localSalt = salt;
            }
            else {
                localSalt = yield bcryptjs_1.default.genSalt(10);
            }
            const hashedPassword = yield bcryptjs_1.default.hash(passwordNoHash, localSalt);
            return new PasswordHashDS_1.default(hashedPassword, localSalt);
        });
    }
}
exports.default = PasswordHasher;
//# sourceMappingURL=PasswordHasher.js.map