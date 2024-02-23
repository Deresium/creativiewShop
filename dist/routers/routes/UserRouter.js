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
const LoginInfoDS_1 = __importDefault(require("../../business/models/datastores/LoginInfoDS"));
const CookiesGenerator_1 = __importDefault(require("../../business/utils/CookiesGenerator"));
class UserRouter extends ApplicationRouter_1.default {
    constructor(userRequester) {
        super();
        this.userRequester = userRequester;
    }
    initRoutes() {
        this.getRouter().post('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const name = req.body.name;
            const firstName = req.body.firstName;
            const password = req.body.password;
            const repeatPassword = req.body.repeatPassword;
            const customerId = req.customer.getCustomerId();
            try {
                yield this.userRequester.createUser(new UserCreationDS_1.default(email, password, repeatPassword, name, firstName, customerId));
                res.send();
            }
            catch (error) {
                console.error(error);
                res.status(400).send(error.message);
            }
        }));
        this.getRouter().post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const customerId = req.customer.getCustomerId();
            try {
                const user = yield this.userRequester.loginUser(new LoginInfoDS_1.default(email, customerId, password));
                if (user) {
                    const cookieGenerator = new CookiesGenerator_1.default(user.getUserId(), user.getRole());
                    res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
                    res.send();
                }
                else {
                    res.status(400).send('login.fail');
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).send();
            }
        }));
        this.getRouter().post('/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cookieGenerator = new CookiesGenerator_1.default(null);
            res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
            res.send();
        }));
        this.getRouter().get('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            if (!userId) {
                res.status(400).send();
                return;
            }
            const user = yield this.userRequester.getUser(userId);
            res.status(200).send(user);
        }));
    }
}
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map