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
        this.getRouter().post('/basket/productOption/:productOptionId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const productOptionId = String(req.params.productOptionId);
            const quantity = req.body.quantity;
            if (!quantity) {
                res.status(400).send();
            }
            const basketProductOption = new BasketProductOptionDS(basketId, productOptionId, quantity);
            await this.basketRequester.addProductOptionToBasket(basketProductOption);
            res.send();
        });

        this.getRouter().get('/basket', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const customer = req.customer;
            const groups = req.userGroups;
            const language = req.query.language;
            const currency = req.query.currency;
            if (!groups) {
                res.status(400).send();
                return;
            }
            const productOptions = await this.basketRequester.getBasket(basketId, groups, customer, currency, language);
            res.send(productOptions);
        });

        this.getRouter().get('/basket/nbItems', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const nbItems = await this.basketRequester.getBasketNbItems(basketId);
            res.status(200).send({nbItems: nbItems});
        });

        this.getRouter().get('/checkBasket', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const customer = req.customer;
            const groups = req.userGroups;
            const language = req.query.language;
            if (!groups) {
                res.status(400).send();
                return;
            }

            const basketReport = await this.basketRequester.checkBasket(basketId, groups, customer, language);
            res.send(basketReport);
        });

        this.getRouter().put('/basket/deliveryOption', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const deliveryOptionId = req.body.deliveryOptionId;
            await this.basketRequester.updateBasketDeliveryOption(basketId, deliveryOptionId);
            res.send();
        });

        this.getRouter().put('/basket/paymentMethod', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const paymentMethod = req.body.paymentMethod;
            await this.basketRequester.updateBasketPaymentMethod(basketId, paymentMethod);
            res.send();
        });

        this.getRouter().put('/basket/productOption/:productOptionId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const productOptionId = String(req.params.productOptionId);
            const quantity = req.body.quantity;
            const basketProductOption = new BasketProductOptionDS(basketId, productOptionId, quantity);
            try {
                await this.basketRequester.updateProductOptionBasket(basketProductOption);
                res.send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });

        this.getRouter().delete('/basket/productOption/:productOptionId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const productOptionId = String(req.params.productOptionId);
            await this.basketRequester.deleteProductOptionBasket(basketId, productOptionId);
            res.send();
        });

        this.getRouter().put('/basket/address/delivery', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const addressId = req.body.addressId;
            await this.basketRequester.updateBasketDeliveryAddress(basketId, addressId);
            res.send();
        });

        this.getRouter().put('/basket/address/billing', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const addressId = req.body.addressId;
            await this.basketRequester.updateBasketBillingAddress(basketId, addressId);
            res.send();
        });

        this.getRouter().get('/basket/deliveryOptions', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const customer = req.customer;
            const groups = req.userGroups;
            const language = req.query.language;
            const currency = req.query.currency;
            if (!groups) {
                res.status(400).send();
                return;
            }

            const deliveryOptions = await this.basketRequester.getDeliveryOptionsForBasket(basketId, groups, customer, currency, language);
            res.send(deliveryOptions);
        });

        this.getRouter().post('/basket/basketToOrder', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, this.extractOpenBasketIdMiddleware, async (req: any, res: any) => {
            const basketId = req.basketId;
            const customer = req.customer;
            const groups = req.userGroups;
            const language = req.query.language;
            const currency = req.query.currency;

            const basketChecker = await this.basketRequester.checkBasket(basketId, groups, customer, language);
            if (basketChecker.hasErrors()) {
                res.status(400).send();
                return;
            }
            await this.basketRequester.basketToOrder(customer, basketId, groups, currency, language);
            res.send();
        });
    }
}