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
const OnlyAdminMiddleware_1 = __importDefault(require("../middlewares/OnlyAdminMiddleware"));
const CategoryCreationDS_1 = __importDefault(require("../../business/models/datastores/CategoryCreationDS"));
class CategoryRouter extends ApplicationRouter_1.default {
    constructor(categoryRequester) {
        super();
        this.categoryRequester = categoryRequester;
    }
    initRoutes() {
        this.getRouter().post('/category', new OnlyAdminMiddleware_1.default().getRequestHandler(), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const parentCategoryId = req.body.parentCategoryId;
            const categoryCreationDS = new CategoryCreationDS_1.default(nameFr, nameEn, parentCategoryId, customerId);
            yield this.categoryRequester.addCategory(categoryCreationDS);
            res.send();
        }));
        this.getRouter().get('/category', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const categories = yield this.categoryRequester.getAllCategories(customerId);
            res.status(200).send(categories);
        }));
        this.getRouter().get('/categoryFlat', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const categoriesFlat = yield this.categoryRequester.getAllCategoriesFlat(customerId);
            res.status(200).send(categoriesFlat);
        }));
        this.getRouter().delete('/category/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const categoryId = String(req.params.categoryId);
            const customerId = req.customer.getCustomerId();
            yield this.categoryRequester.deleteCategory(categoryId, customerId);
            res.status(200).send();
        }));
    }
}
exports.default = CategoryRouter;
//# sourceMappingURL=CategoryRouter.js.map