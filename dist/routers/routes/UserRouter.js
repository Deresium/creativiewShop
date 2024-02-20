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
const ApplicationRouter_1 = __importDefault(require("./ApplicationRouter"));
const UserCreationDS_1 = __importDefault(require("../../business/models/datastores/UserCreationDS"));
class UserRouter extends ApplicationRouter_1.default {
    constructor(userRequester) {
        super();
        this.userRequester = userRequester;
    }
    initRoutes() {
        this.getRouter().post('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.userRequester.createUser(new UserCreationDS_1.default('', '', '', '', '', 1));
        }));
    }
}
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map