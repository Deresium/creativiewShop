import ApplicationRouter from "./ApplicationRouter";
import ICurrencyRateRequester from "../../business/requesters/ICurrencyRateRequester";
import {RequestHandler} from "express";

export default class CurrencyRateRouter extends ApplicationRouter {
    private readonly currencyRateRequester: ICurrencyRateRequester;
    private readonly onlyAdminMiddleware: RequestHandler;


    constructor(currencyRateRequester: ICurrencyRateRequester, onlyAdminMiddleware: RequestHandler) {
        super();
        this.currencyRateRequester = currencyRateRequester;
        this.onlyAdminMiddleware = onlyAdminMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/currencyRate/:currencyCode', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const currencyCode = String(req.params.currencyCode);
            const rate = req.body.rate;
            const customerId = req.customer.getCustomerId();
            await this.currencyRateRequester.addCurrencyRate(currencyCode, rate, customerId);
        });

        this.getRouter().get('/currencyRate/:currencyCode', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const currencyCode = String(req.params.currencyCode);
            const customerId = req.customer.getCustomerId();
            const currencyRates = await this.currencyRateRequester.getCurrencyRates(currencyCode, customerId);
            res.send(currencyRates);
        });

        this.getRouter().get('/currency', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const currency = await this.currencyRateRequester.getCurrency();
            res.send(currency);
        });
    }
}