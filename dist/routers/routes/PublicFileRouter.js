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
class PublicFileRouter extends ApplicationRouter_1.default {
    constructor(categoryRequester) {
        super();
        this.categoryRequester = categoryRequester;
        this.initRoutes();
    }
    initRoutes() {
        this.getRouter().get('/category/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const categoryId = String(req.params.categoryId);
            const customerId = req.customer.getCustomerId();
            const fileVM = yield this.categoryRequester.getCategoryImage(categoryId, customerId);
            if (fileVM) {
                res.setHeader('Content-Type', fileVM.getContentType());
                res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(fileVM.getFileName())}`);
                res.end(fileVM.getFile(), 'base64');
            }
            else {
                res.status(404).send();
            }
        }));
    }
}
exports.default = PublicFileRouter;
//# sourceMappingURL=PublicFileRouter.js.map