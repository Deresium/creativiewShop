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
const ProductOptionPriceVM_1 = __importDefault(require("../models/viewmodels/ProductOptionPriceVM"));
class ProductOptionPriceFacade {
    constructor(productOptionPriceDataGateway) {
        this.productOptionPriceDataGateway = productOptionPriceDataGateway;
    }
    getPricesForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pricesReturn = new Array;
            const prices = yield this.productOptionPriceDataGateway.getPricesForProductOption(productOptionId);
            for (const price of prices) {
                let startDate = null;
                let endDate = null;
                if (price.getStartDate()) {
                    startDate = price.getStartDate().toISOString();
                }
                if (price.getEndDate()) {
                    endDate = price.getEndDate().toISOString();
                }
                pricesReturn.push(new ProductOptionPriceVM_1.default(startDate, endDate, price.getPrice()));
            }
            return pricesReturn;
        });
    }
    updatePrice(productOptionId, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productOptionPriceDataGateway.updatePrice(productOptionId, price);
        });
    }
}
exports.default = ProductOptionPriceFacade;
//# sourceMappingURL=ProductOptionPriceFacade.js.map