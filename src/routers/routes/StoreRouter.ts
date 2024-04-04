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
        this.getRouter().get('/store/storeAccess', async (req: any, res: any) => {
            const hasAccessToStore = StoreAccess.hasAccessToStore(req.userId, req.customer.getStoreProtectionCode());
            res.send(hasAccessToStore);
        });

        this.getRouter().get('/store/featuredProduct', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const productOptions = await this.productOptionRequester.getProductOptionFeatured(customerId);
            res.send(productOptions);
        });


        this.getRouter().get('/store/discount', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const groups = req.userGroups;
            if (!groups) {
                res.status(400).send();
                return;
            }
            const productOptions = await this.productOptionRequester.getProductOptionDiscount(customerId, groups);
            res.send(productOptions);
        });

        this.getRouter().get('/store', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const searchTerm = req.query.searchTerm;
            const categoryIds = req.query.categoryIds;
            const language = req.query.language;
            const productOptions = await this.productOptionRequester.getProductOptionSearch(customerId, searchTerm, categoryIds, language);
            res.send(productOptions);
        });

        this.getRouter().get('/store/:productOptionId', this.checkStoreAccessMiddleware, async (req: any, res: any) => {
            const customer = req.customer;
            const productOptionId = String(req.params.productOptionId);
            const groups = req.userGroups;
            const language = req.query.language;
            const currency = req.query.currency;
            if (!groups) {
                res.status(400).send();
                return;
            }
            const productOption = await this.productOptionRequester.getProductOptionStore(productOptionId, groups, customer, currency, language);
            res.send(productOption);
        });
    }
}