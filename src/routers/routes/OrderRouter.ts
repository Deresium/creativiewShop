import ApplicationRouter from "./ApplicationRouter";
import IBasketRequester from "../../business/requesters/IBasketRequester";
import {RequestHandler} from "express";
import IAddressRequester from "../../business/requesters/IAddressRequester";

export default class OrderRouter extends ApplicationRouter {
    private readonly basketRequester: IBasketRequester;
    private readonly addressRequester: IAddressRequester;
    private readonly checkBasketAccessMiddleware: RequestHandler;
    private readonly onlyAdminStoreMiddleware: RequestHandler;


    constructor(basketRequester: IBasketRequester, addressRequester: IAddressRequester, checkBasketAccessMiddleware: RequestHandler, onlyAdminStoreMiddleware: RequestHandler) {
        super();
        this.basketRequester = basketRequester;
        this.addressRequester = addressRequester;
        this.checkBasketAccessMiddleware = checkBasketAccessMiddleware;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/order/user', async (req: any, res: any) => {
            const userId = req.userId;
            const baskets = await this.basketRequester.getOrdersForUser(userId);
            res.send(baskets);
        });

        this.getRouter().get('/order/customer', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const baskets = await this.basketRequester.getOrdersForCustomer(customerId);
            res.send(baskets);
        });

        this.getRouter().get('/order/address/:addressId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const addressId = String(req.params.addressId);
            const language = req.query.language;
            const address = await this.addressRequester.getAddressById(addressId, language);
            res.send(address);
        });

        this.getRouter().get('/order/:basketId', this.checkBasketAccessMiddleware, async (req: any, res: any) => {
            const basketId = String(req.params.basketId);
            const customer = req.customer;
            const language = req.query.language;
            const basket = await this.basketRequester.getBasketOrder(basketId, customer, language);
            res.send(basket);
        });

        this.getRouter().post('/order/:basketId/paid', this.onlyAdminStoreMiddleware, this.checkBasketAccessMiddleware, async (req: any, res: any) => {
            const basketId = String(req.params.basketId);
            await this.basketRequester.orderToPaid(basketId);
            res.send();
        });

        this.getRouter().post('/order/:basketId/delivered', this.onlyAdminStoreMiddleware, this.checkBasketAccessMiddleware, async (req: any, res: any) => {
            const basketId = String(req.params.basketId);
            await this.basketRequester.paidToDelivered(basketId);
            res.send();
        });
    }
}