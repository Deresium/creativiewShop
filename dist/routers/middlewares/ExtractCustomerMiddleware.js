"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationMiddleware_1 = __importDefault(require("./ApplicationMiddleware"));
const CustomerCacheSingleton_1 = __importDefault(require("../../business/cache/CustomerCacheSingleton"));
class ExtractCustomerMiddleware extends ApplicationMiddleware_1.default {
    constructor() {
        super();
    }
    defineMiddlewareFunction() {
        return (req, res, next) => {
            const dnsName = req.get('host').split(':')[0];
            req.customer = CustomerCacheSingleton_1.default.getInstance().getCustomer(dnsName);
            next();
        };
    }
}
exports.default = ExtractCustomerMiddleware;
//# sourceMappingURL=ExtractCustomerMiddleware.js.map