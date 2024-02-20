import ApplicationRouter from "./ApplicationRouter";
import ICustomerRequester from "../../business/requesters/ICustomerRequester";

export default class CustomerRouter extends ApplicationRouter {
    private readonly customerRequester: ICustomerRequester;

    constructor(customerRequester: ICustomerRequester) {
        super();
        this.customerRequester = customerRequester;
    }

    public initRoutes() {
        this.getRouter().get('/customerInfo', async (req: any, res: any) => {
            const customerId = req.customerId;
            if (!customerId) {
                res.status(400).send();
                return;
            }
            const customer = await this.customerRequester.getCustomerInfo(customerId);
            res.status(200).send(customer);
        });
    }
}