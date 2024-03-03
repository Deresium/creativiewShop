import ApplicationRouter from "./ApplicationRouter";
import IProductOptionRequester from "../../business/requesters/IProductOptionRequester";
import {RequestHandler} from "express";
import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";

export default class ProductOptionRouter extends ApplicationRouter {
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;
    private readonly checkProductOwnerMiddleware: RequestHandler;


    constructor(productOptionRequester: IProductOptionRequester, onlyAdminStoreMiddleware: RequestHandler, checkProductOwnerMiddleware: RequestHandler) {
        super();
        this.productOptionRequester = productOptionRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.checkProductOwnerMiddleware = checkProductOwnerMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const productOptionId = await this.productOptionRequester.createProductOption(productId);
            res.send(productOptionId);
        });

        this.getRouter().get('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const productOptions = await this.productOptionRequester.getProductOptionByProduct(productId);
            res.send(productOptions);
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const productOption = await this.productOptionRequester.getProductOption(productOptionId);
            res.send(productOption);
        });

        this.getRouter().put('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const code = req.body.code;
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const stock = req.body.stock;
            const weight = req.body.weight;
            const active = req.body.active;
            const preorder = req.body.preorder;
            const featured = req.body.featured;

            const productOptionUpdateDs = new ProductOptionUpdateDS(productOptionId, code, nameFr, nameEn, weight, stock, active, preorder, featured);
            await this.productOptionRequester.updateProductOption(productOptionUpdateDs);
            res.send();
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            await this.productOptionRequester.deleteProductOption(productOptionId);
            res.send();
        });
    }
}