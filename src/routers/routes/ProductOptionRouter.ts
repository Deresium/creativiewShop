import ApplicationRouter from "./ApplicationRouter";
import IProductOptionRequester from "../../business/requesters/IProductOptionRequester";
import {RequestHandler} from "express";

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
            await this.productOptionRequester.createProductOption(productId);
            res.send();
        });
    }
}