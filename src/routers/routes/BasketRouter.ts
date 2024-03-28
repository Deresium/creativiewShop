import ApplicationRouter from "./ApplicationRouter";
import IBasketRequester from "../../business/requesters/IBasketRequester";
import {RequestHandler} from "express";
import BasketProductOptionDS from "../../business/models/datastores/BasketProductOptionDS";

export default class BasketRouter extends ApplicationRouter {
    private readonly basketRequester: IBasketRequester;
    private readonly checkStoreAccessMiddleware: RequestHandler;
    private readonly extractOrCreateUserTempMiddleware: RequestHandler;
    private readonly extractOpenBasketIdMiddleware: RequestHandler;


    constructor(basketRequester: IBasketRequester, checkStoreAccessMiddleware: RequestHandler, extractOrCreateUserTempMiddleware: RequestHandler, extractOpenBasketIdMiddleware: RequestHandler) {
        super();
        this.basketRequester = basketRequester;
        this.checkStoreAccessMiddleware = checkStoreAccessMiddleware;
        this.extractOrCreateUserTempMiddleware = extractOrCreateUserTempMiddleware;
        this.extractOpenBasketIdMiddleware = extractOpenBasketIdMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/basket/:productOptionId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async(req: any, res: any) => {
            const basketId = req.basketId;
            const productOptionId = String(req.params.productOptionId);
            const quantity = req.body.quantity;
            const basketProductOption = new BasketProductOptionDS(basketId, productOptionId, quantity);
            await this.basketRequester.addProductOptionToBasket(basketProductOption);
            res.send();
        });

        this.getRouter().get('/basket', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async(req: any, res: any) => {
            const basketId = req.basketId;
            const productOptions = await this.basketRequester.getBasketProductOptions(basketId);
            res.send(productOptions);
        });

        this.getRouter().put('/basket/:productOptionId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async(req: any, res: any) => {
            const basketId = req.basketId;
            const productOptionId = String(req.params.productOptionId);
            const quantity = req.body.quantity;
            const basketProductOption = new BasketProductOptionDS(basketId, productOptionId, quantity);
            await this.basketRequester.updateProductOptionBasket(basketProductOption);
            res.send();
        });

        this.getRouter().delete('/basket/:productOptionId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async(req: any, res: any) => {
            const basketId = req.basketId;
            const productOptionId = String(req.params.productOptionId);
            await this.basketRequester.deleteProductOptionBasket(basketId, productOptionId);
            res.send();
        });
    }
}