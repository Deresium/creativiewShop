import ApplicationRouter from "./ApplicationRouter";
import StoreAccess from "../../business/utils/StoreAccess";
import IProductOptionRequester from "../../business/requesters/IProductOptionRequester";
import {RequestHandler} from "express";

export default class StoreRouter extends ApplicationRouter {
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly checkStoreAccessMiddleware: RequestHandler;


    constructor(productOptionRequester: IProductOptionRequester, checkStoreAccessMiddleware: RequestHandler) {
        super();
        this.productOptionRequester = productOptionRequester;
        this.checkStoreAccessMiddleware = checkStoreAccessMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/store/storeAccess', async (req: any, res: any, next: any) => {
            try {
                const hasAccessToStore = StoreAccess.hasAccessToStore(req.userId, req.customer.getStoreProtectionCode());
                res.send(hasAccessToStore);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/store/featuredProduct', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const productOptions = await this.productOptionRequester.getProductOptionFeatured(customerId);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/store/onlyOneLeft', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const productOptions = await this.productOptionRequester.getProductOptionOnlyOneLeft(customerId);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/store/random', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const productOptions = await this.productOptionRequester.getProductOptionRandom(customerId);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/store/lastOneAdded', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const productOptions = await this.productOptionRequester.getProductOptionLastOneAdded(customerId);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });


        this.getRouter().get('/store/discount', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const groups = req.userGroups;
                if (!groups) {
                    res.status(400).send();
                    return;
                }
                const productOptions = await this.productOptionRequester.getProductOptionDiscount(customerId, groups);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/store', async (req: any, res: any, next: any) => {
            try {
                const customer = req.customer;
                const searchTerm = req.query.searchTerm;
                const categoryIds = req.query.categoryIds;
                const orderBy = req.query.orderBy;
                const manufacturerIds = req.query.manufacturerIds;
                const language = req.query.language;
                const groups = req.userGroups;
                const currency = req.query.currency;
                const productOptions = await this.productOptionRequester.getProductOptionSearch(customer, groups, searchTerm, categoryIds, manufacturerIds, currency, language, orderBy);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/store/:productOptionId', this.checkStoreAccessMiddleware, async (req: any, res: any, next: any) => {
            try {
                const customer = req.customer;
                const productOptionId = String(req.params.productOptionId);
                const groups = req.userGroups;
                const language = req.query.language;
                const currency = req.query.currency;
                if (!groups) {
                    res.status(400).send();
                    return;
                }
                const productOption = await this.productOptionRequester.getProductOptionStoreVM(productOptionId, groups, customer, currency, language);
                res.send(productOption);
            } catch (error) {
                next(error);
            }
        });
    }
}