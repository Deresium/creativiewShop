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
const ProductUpdateDS_1 = __importDefault(require("../../business/models/datastores/ProductUpdateDS"));
class ProductRouter extends ApplicationRouter_1.default {
    constructor(productRequester, onlyAdminStoreMiddleware) {
        super();
        this.productRequester = productRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }
    initRoutes() {
        this.getRouter().post('/product', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const productId = yield this.productRequester.createProduct(customerId);
            res.send(productId);
        }));
        this.getRouter().delete('/product/:productId', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            yield this.productRequester.deleteProduct(productId, customerId);
            res.send();
        }));
        this.getRouter().put('/product/:productId', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            const manufacturerId = req.body.manufacturerId;
            const code = req.body.code;
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const descriptionFr = req.body.descriptionFr;
            const descriptionEn = req.body.descriptionEn;
            const productUpdateDS = new ProductUpdateDS_1.default(productId, customerId, manufacturerId, code, nameFr, nameEn, descriptionFr, descriptionEn);
            yield this.productRequester.updateProduct(productUpdateDS);
            res.send();
        }));
        this.getRouter().get('/product/:productId', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            const product = yield this.productRequester.getProduct(productId, customerId);
            res.status(200).send(product);
        }));
        this.getRouter().get('/product', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const products = yield this.productRequester.getAllProduct(customerId);
            res.status(200).send(products);
        }));
        this.getRouter().get('/productListAdmin', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const products = yield this.productRequester.getListAdminProducts(customerId);
            res.status(200).send(products);
        }));
    }
}
exports.default = ProductRouter;
//# sourceMappingURL=ProductRouter.js.map