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
const ProductListAdminVM_1 = __importDefault(require("../models/viewmodels/ProductListAdminVM"));
const ProductOptionListAdminVM_1 = __importDefault(require("../models/viewmodels/ProductOptionListAdminVM"));
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
    getListAdminProducts(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productDataGateway.getAllProductsAdmin(customerId);
            return products.map(product => this.productEntityToProductListAdminVM(product));
        });
    }
    productEntityToProductVM(productEntity) {
        return new ProductVM_1.default(productEntity.getProductId(), productEntity.getCustomerId(), productEntity.getManufacturerId(), productEntity.getManufacturerName(), productEntity.getCode(), productEntity.getNameFr(), productEntity.getNameEn(), productEntity.getDescriptionFr(), productEntity.getDescriptionEn());
    }
    productEntityToProductListAdminVM(productEntity) {
        const productOptions = new Array();
        for (const productOption of productEntity.getProductOptions()) {
            let price = null;
            if (productOption.getListPrices() && productOption.getListPrices().length === 1) {
                price = Number(productOption.getListPrices()[0].getPrice()).toFixed(2);
            }
            productOptions.push(new ProductOptionListAdminVM_1.default(productOption.getNameFr(), productOption.getActive(), productOption.getStock(), price));
        }
        return new ProductListAdminVM_1.default(productEntity.getProductId(), productEntity.getCustomerId(), productEntity.getManufacturerId(), productEntity.getManufacturerName(), productEntity.getCode(), productEntity.getNameFr(), productEntity.getNameEn(), productEntity.getDescriptionFr(), productEntity.getDescriptionEn(), productOptions);
    }
}
exports.default = ProductFacade;
//# sourceMappingURL=ProductFacade.js.map