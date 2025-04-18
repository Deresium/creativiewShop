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
        this.getRouter().post('/currencyRate/:currencyCode', this.onlyAdminMiddleware, async (req: any, res: any, next: any) => {
            try {
                const currencyCode = String(req.params.currencyCode);
                const rate = String(req.body.rate);
                const customerId = req.customer.getCustomerId();
                await this.currencyRateRequester.addCurrencyRate(currencyCode, rate, customerId);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/currencyRate/:currencyCode', this.onlyAdminMiddleware, async (req: any, res: any, next: any) => {
            try {
                const currencyCode = String(req.params.currencyCode);
                const customerId = req.customer.getCustomerId();
                const currencyRates = await this.currencyRateRequester.getCurrencyRates(currencyCode, customerId);
                res.send(currencyRates);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/currency', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const currency = await this.currencyRateRequester.getCurrency(customerId);
                res.send(currency);
            } catch (error) {
                next(error);
            }
        });
    }
}