import {RequestHandler} from "express";
import IPaymentMethodRequester from "../../business/requesters/IPaymentMethodRequester";
import ApplicationRouter from "./ApplicationRouter";

export default class AdminGlobalRouter extends ApplicationRouter {
    private readonly paymentMethodRequester: IPaymentMethodRequester;
    private readonly onlyAdminGlobalMiddleware: RequestHandler;

    constructor(paymentMethodRequester: IPaymentMethodRequester, onlyAdminGlobalMiddleware: RequestHandler) {
        super();
        this.paymentMethodRequester = paymentMethodRequester;
        this.onlyAdminGlobalMiddleware = onlyAdminGlobalMiddleware;
        this.initRoutes();
    }

    public initRoutes(): void {
        this.getRouter().put('/adminGlobal/onlinePaymentInfo', this.onlyAdminGlobalMiddleware, async (req: any, res: any, next: any) => {
            try {
                const customerId = req.body.customerId;
                const key = req.body.key;
                const secret = req.body.secret;

                await this.paymentMethodRequester.updateKeySecretForCustomerOnlinePayment(key, secret, customerId);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/adminGlobal/onlinePaymentInfo', this.onlyAdminGlobalMiddleware, async (req: any, res: any, next: any) => {
            try {
                const paymentInfoOnline = await this.paymentMethodRequester.getPaymentMethodInfoOnlineCustomer();
                res.send(paymentInfoOnline);
            } catch (error) {
                next(error);
            }
        });
    }
}