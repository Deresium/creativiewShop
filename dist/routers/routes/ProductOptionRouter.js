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
const ProductOptionUpdateDS_1 = __importDefault(require("../../business/models/datastores/ProductOptionUpdateDS"));
const multer_1 = __importDefault(require("multer"));
const ProductOptionDiscountDS_1 = __importDefault(require("../../business/models/datastores/ProductOptionDiscountDS"));
class ProductOptionRouter extends ApplicationRouter_1.default {
    constructor(productOptionRequester, productOptionPriceRequester, productOptionCategoryRequester, productOptionPictureRequester, productOptionDiscountRequester, onlyAdminStoreMiddleware, checkProductOwnerMiddleware) {
        super();
        this.productOptionRequester = productOptionRequester;
        this.productOptionPriceRequester = productOptionPriceRequester;
        this.productOptionCategoryRequester = productOptionCategoryRequester;
        this.productOptionPictureRequester = productOptionPictureRequester;
        this.productOptionDiscountRequester = productOptionDiscountRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.checkProductOwnerMiddleware = checkProductOwnerMiddleware;
        this.initRoutes();
    }
    initRoutes() {
        this.getRouter().post('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = String(req.params.productId);
            const productOptionId = yield this.productOptionRequester.createProductOption(productId);
            res.send(productOptionId);
        }));
        this.getRouter().get('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = String(req.params.productId);
            const productOptions = yield this.productOptionRequester.getProductOptionByProduct(productId);
            res.send(productOptions);
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const productOption = yield this.productOptionRequester.getProductOption(productOptionId);
            res.send(productOption);
        }));
        this.getRouter().put('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const code = req.body.code;
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const stock = req.body.stock;
            const weight = req.body.weight;
            const active = req.body.active;
            const preorder = req.body.preorder;
            const featured = req.body.featured;
            const productOptionUpdateDs = new ProductOptionUpdateDS_1.default(productOptionId, code, nameFr, nameEn, weight, stock, active, preorder, featured);
            yield this.productOptionRequester.updateProductOption(productOptionUpdateDs);
            res.send();
        }));
        this.getRouter().delete('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            yield this.productOptionRequester.deleteProductOption(productOptionId);
            res.send();
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId/price', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const prices = yield this.productOptionPriceRequester.getPricesForProductOption(productOptionId);
            res.send(prices);
        }));
        this.getRouter().post('/product/:productId/productOption/:productOptionId/price', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const price = req.body.price;
            yield this.productOptionPriceRequester.updatePrice(productOptionId, price);
            res.send();
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId/category', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const categoriesId = yield this.productOptionCategoryRequester.getProductOptionCategoriesId(productOptionId);
            res.send(categoriesId);
        }));
        this.getRouter().put('/product/:productId/productOption/:productOptionId/category', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const categoriesId = req.body.categoriesId;
            yield this.productOptionCategoryRequester.replaceCategories(productOptionId, categoriesId);
            res.send();
        }));
        const upload = (0, multer_1.default)();
        this.getRouter().post('/product/:productId/productOption/:productOptionId/image', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, upload.single('file'), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const image = req.file.buffer;
            const imageName = req.file.originalname;
            yield this.productOptionPictureRequester.addProductOptionPicture(image, productOptionId, imageName);
            res.send();
        }));
        this.getRouter().delete('/product/:productId/productOption/:productOptionId/image/:productOptionImageId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionImageId = String(req.params.productOptionImageId);
            yield this.productOptionPictureRequester.deleteProductOptionPicture(productOptionImageId);
            res.send();
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId/image', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const productOptionPicturesId = yield this.productOptionPictureRequester.getPicturesForProductOption(productOptionId);
            res.send(productOptionPicturesId);
        }));
        this.getRouter().post('/product/:productId/productOption/:productOptionId/discount', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const groupId = req.body.groupId;
            const percent = req.body.percent;
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);
            const productOptionDiscount = new ProductOptionDiscountDS_1.default(productOptionId, groupId, percent, startDate, endDate);
            try {
                yield this.productOptionDiscountRequester.addProductOptionDiscount(productOptionDiscount);
                res.send();
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        }));
        this.getRouter().delete('/product/:productId/productOption/:productOptionId/discount/:productOptionDiscountId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionDiscountId = String(req.params.productOptionDiscountId);
            yield this.productOptionDiscountRequester.deleteProductOptionDiscount(productOptionDiscountId);
            res.send();
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId/discount', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const discounts = yield this.productOptionDiscountRequester.getDiscountsForProductOption(productOptionId);
            res.send(discounts);
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId/percentCalculator', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const discountPrice = Number(req.query.discountPrice);
            const percent = yield this.productOptionPriceRequester.calculatePercentForProductOption(productOptionId, discountPrice);
            res.send({ percent: percent });
        }));
        this.getRouter().get('/product/:productId/productOption/:productOptionId/lastPrice', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productOptionId = String(req.params.productOptionId);
            const price = yield this.productOptionPriceRequester.getLastPriceForProductOption(productOptionId);
            res.send({ price: price });
        }));
    }
}
exports.default = ProductOptionRouter;
//# sourceMappingURL=ProductOptionRouter.js.map