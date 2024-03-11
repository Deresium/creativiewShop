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
const CurrencyRateVM_1 = __importDefault(require("../models/viewmodels/CurrencyRateVM"));
const CurrencyVM_1 = __importDefault(require("../models/viewmodels/CurrencyVM"));
class CurrencyRateFacade {
    constructor(currencyRateDataGateway) {
        this.currencyRateDataGateway = currencyRateDataGateway;
    }
    addCurrencyRate(currencyCode, rate, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.currencyRateDataGateway.addCurrencyRate(currencyCode, rate, customerId);
        });
    }
    getCurrencyRates(currencyCode, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyRateReturn = new Array();
            const currencyRates = yield this.currencyRateDataGateway.getCurrencyRates(currencyCode, customerId);
            for (const currencyRate of currencyRates) {
                let endDate = null;
                const startDate = currencyRate.getStartDate().toISOString();
                if (currencyRate.getEndDate()) {
                    endDate = currencyRate.getEndDate().toISOString();
                }
                currencyRateReturn.push(new CurrencyRateVM_1.default(currencyRate.getCurrencyRateId(), currencyCode, currencyRate.getRate(), startDate, endDate));
            }
            return currencyRateReturn;
        });
    }
    getCurrency(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = yield this.currencyRateDataGateway.getCustomerCurrency(customerId);
            return currencies.map(currency => new CurrencyVM_1.default(currency.getCurrency().getCurrencyCode(), currency.getCurrency().getName(), currency.getCurrency().getSymbol()));
        });
    }
}
exports.default = CurrencyRateFacade;
//# sourceMappingURL=CurrencyRateFacade.js.map