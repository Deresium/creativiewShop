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
const ProductOptionDiscountVM_1 = __importDefault(require("../models/viewmodels/ProductOptionDiscountVM"));
const PercentCalculator_1 = __importDefault(require("../utils/PercentCalculator"));
class ProductOptionDiscountFacade {
    constructor(productOptionDiscountDataGateway) {
        this.productOptionDiscountDataGateway = productOptionDiscountDataGateway;
    }
    addProductOptionDiscount(productOptionDiscountDs) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            if (!productOptionDiscountDs.getStartDate() || !productOptionDiscountDs.getEndDate()) {
                return;
            }
            if (productOptionDiscountDs.getStartDate() < now
                || productOptionDiscountDs.getEndDate() < now) {
                throw new Error('error.date.past');
            }
            if (productOptionDiscountDs.getEndDate() <= productOptionDiscountDs.getStartDate()) {
                throw new Error('error.date.startAfter');
            }
            yield this.productOptionDiscountDataGateway.addProductOptionDiscount(productOptionDiscountDs);
        });
    }
    deleteProductOptionDiscount(productOptionDiscountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productOptionDiscountDataGateway.deleteProductOptionDiscount(productOptionDiscountId);
        });
    }
    getDiscountsForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const discountsReturn = new Array();
            const productDiscounts = yield this.productOptionDiscountDataGateway.getDiscountsForProductOption(productOptionId);
            for (const productDiscount of productDiscounts) {
                const startDate = productDiscount.getStartDate().toISOString();
                const endDate = productDiscount.getEndDate().toISOString();
                let deletedAtDate = null;
                if (productDiscount.getDeletedAt()) {
                    deletedAtDate = productDiscount.getDeletedAt().toISOString();
                }
                const percent = `${Number(productDiscount.getPercent()).toFixed(2)}%`;
                discountsReturn.push(new ProductOptionDiscountVM_1.default(productDiscount.getProductOptionDiscountId(), productDiscount.getProductOptionId(), productDiscount.getGroupId(), percent, startDate, endDate, deletedAtDate));
            }
            return discountsReturn;
        });
    }
    calculateDiscountPercent(originalPrice, discountPrice) {
        return PercentCalculator_1.default.calculatePercentBasedOnPrices(originalPrice, discountPrice);
    }
}
exports.default = ProductOptionDiscountFacade;
//# sourceMappingURL=ProductOptionDiscountFacade.js.map