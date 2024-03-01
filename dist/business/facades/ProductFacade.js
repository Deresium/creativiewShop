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
const ProductVM_1 = __importDefault(require("../models/viewmodels/ProductVM"));
class ProductFacade {
    constructor(productDataGateway) {
        this.productDataGateway = productDataGateway;
    }
    createProduct(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productDataGateway.createProduct(customerId);
        });
    }
    deleteProduct(productId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productDataGateway.deleteProduct(productId, customerId);
        });
    }
    getAllProduct(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productEntities = yield this.productDataGateway.getAllProduct(customerId);
            return productEntities.map(productEntity => this.productEntityToProductVM(productEntity));
        });
    }
    getProduct(productId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productEntity = yield this.productDataGateway.getProduct(productId, customerId);
            return this.productEntityToProductVM(productEntity);
        });
    }
    productExistsForCustomer(productId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productDataGateway.productExistsForCustomer(productId, customerId);
        });
    }
    updateProduct(productUpdateDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productDataGateway.updateProduct(productUpdateDS);
        });
    }
    productEntityToProductVM(productEntity) {
        return new ProductVM_1.default(productEntity.getProductId(), productEntity.getCustomerId(), productEntity.getManufacturerId(), productEntity.getManufacturerName(), productEntity.getCode(), productEntity.getNameFr(), productEntity.getNameEn(), productEntity.getDescriptionFr(), productEntity.getDescriptionEn());
    }
}
exports.default = ProductFacade;
//# sourceMappingURL=ProductFacade.js.map