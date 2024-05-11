import ApplicationRouter from "./ApplicationRouter";
import IPaymentMethodRequester from "../../business/requesters/IPaymentMethodRequester";

export default class PaymentMethodRouter extends ApplicationRouter {
    private readonly paymentMethodRequester: IPaymentMethodRequester;


    constructor(paymentMethodRequester: IPaymentMethodRequester) {
        super();
        this.paymentMethodRequester = paymentMethodRequester;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/paymentMethod', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const paymentMethods = await this.paymentMethodRequester.getPaymentMethodsForCustomer(customerId);
                res.send(paymentMethods);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/paypalMe/url', async (req: any, res: any, next: any) => {
            try {
                const total = String(req.query.total);
                const currencyCode = String(req.query.currencyCode);
                const customerId = req.customer.customerId;
                const url = await this.paymentMethodRequester.getPaypalMeURL(customerId, total, currencyCode);
                res.send(url);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/paypalMe/qrcode', async (req: any, res: any, next: any) => {
            try {
                const total = String(req.query.total);
                const currencyCode = String(req.query.currencyCode);
                const customerId = req.customer.customerId;
                const qrcode = await this.paymentMethodRequester.getPaypalQrCode(customerId, total, currencyCode);
                res.send(qrcode);
            } catch (error) {
                next(error);
            }
        });
    }
}