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
class CurrencyRateRouter extends ApplicationRouter_1.default {
    constructor(currencyRateRequester, onlyAdminMiddleware) {
        super();
        this.currencyRateRequester = currencyRateRequester;
        this.onlyAdminMiddleware = onlyAdminMiddleware;
        this.initRoutes();
    }
    initRoutes() {
        this.getRouter().post('/currencyRate/:currencyCode', this.onlyAdminMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const currencyCode = String(req.params.currencyCode);
            const rate = req.body.rate;
            const customerId = req.customer.getCustomerId();
            yield this.currencyRateRequester.addCurrencyRate(currencyCode, rate, customerId);
            res.send();
        }));
        this.getRouter().get('/currencyRate/:currencyCode', this.onlyAdminMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const currencyCode = String(req.params.currencyCode);
            const customerId = req.customer.getCustomerId();
            const currencyRates = yield this.currencyRateRequester.getCurrencyRates(currencyCode, customerId);
            res.send(currencyRates);
        }));
        this.getRouter().get('/currency', this.onlyAdminMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const currency = yield this.currencyRateRequester.getCurrency(customerId);
            res.send(currency);
        }));
    }
}
exports.default = CurrencyRateRouter;
//# sourceMappingURL=CurrencyRateRouter.js.map