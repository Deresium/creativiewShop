"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationMiddleware_1 = __importDefault(require("./ApplicationMiddleware"));
class AllowLocalhostMiddleware extends ApplicationMiddleware_1.default {
    constructor() {
        super();
    }
    defineMiddlewareFunction() {
        return (req, res, next) => {
            res.header("Access-Control-Allow-Origin", `http://${process.env.DNS_NAME}:8080`);
            res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, credentials");
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        };
    }
}
exports.default = AllowLocalhostMiddleware;
//# sourceMappingURL=AllowLocahostMiddleware.js.map