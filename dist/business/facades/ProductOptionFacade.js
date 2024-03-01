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
const ProductOptionVM_1 = __importDefault(require("../models/viewmodels/ProductOptionVM"));
class ProductOptionFacade {
    constructor(productOptionDataGateway) {
        this.productOptionDataGateway = productOptionDataGateway;
    }
    createProductOption(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productOptionDataGateway.createProductOption(productId);
        });
    }
    deleteProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productOptionDataGateway.deleteProductOption(productOptionId);
        });
    }
    getProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productOption = yield this.productOptionDataGateway.getProductOption(productOptionId);
            return this.productOptionEntityToVM(productOption);
        });
    }
    getProductOptionByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productOptions = yield this.productOptionDataGateway.getProductOptionByProduct(productId);
            return productOptions.map(productOption => this.productOptionEntityToVM(productOption));
        });
    }
    getProductOptionIdByCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productOptionDataGateway.getProductOptionIdByCustomer(customerId);
        });
    }
    updateProductOption(productOptionUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productOptionDataGateway.updateProductOption(productOptionUpdate);
        });
    }
    productOptionEntityToVM(productOption) {
        return new ProductOptionVM_1.default(productOption.getProductOptionId(), productOption.getProductId(), productOption.getNameFr(), productOption.getNameEn(), productOption.getCode(), productOption.getStock(), productOption.getActive(), productOption.getFeatured(), productOption.getClick(), productOption.getWeight(), productOption.getPreorder());
    }
}
exports.default = ProductOptionFacade;
//# sourceMappingURL=ProductOptionFacade.js.map