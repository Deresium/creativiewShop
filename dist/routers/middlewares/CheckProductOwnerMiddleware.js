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
const ApplicationMiddleware_1 = __importDefault(require("./ApplicationMiddleware"));
class CheckProductOwnerMiddleware extends ApplicationMiddleware_1.default {
    constructor(productRequester) {
        super();
        this.productRequester = productRequester;
    }
    defineMiddlewareFunction() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            const productExists = yield this.productRequester.productExistsForCustomer(productId, customerId);
            if (productExists) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        });
    }
}
exports.default = CheckProductOwnerMiddleware;
//# sourceMappingURL=CheckProductOwnerMiddleware.js.map