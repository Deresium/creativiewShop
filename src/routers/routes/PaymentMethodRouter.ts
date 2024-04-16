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
        this.getRouter().get('/paymentMethod', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const paymentMethods = await this.paymentMethodRequester.getPaymentMethodsForCustomer(customerId);
            res.send(paymentMethods);
        });
    }
}