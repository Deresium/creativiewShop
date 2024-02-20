"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationMiddleware_1 = __importDefault(require("./ApplicationMiddleware"));
class RedirectHttpsMiddleware extends ApplicationMiddleware_1.default {
    constructor() {
        super();
    }
    defineMiddlewareFunction() {
        return (req, res, next) => {
            if (req.header('x-forwarded-proto') !== 'https')
                res.redirect(`https://${req.hostname}${req.url}`);
            else if (!req.hostname.startsWith('www.'))
                res.redirect(`https://www.${req.hostname}${req.url}`);
            else
                next();
        };
    }
}
exports.default = RedirectHttpsMiddleware;
//# sourceMappingURL=RedirectHttpsMiddleware.js.map