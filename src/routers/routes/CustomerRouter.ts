import ApplicationRouter from "./ApplicationRouter";
import ICustomerRequester from "../../business/requesters/ICustomerRequester";

export default class CustomerRouter extends ApplicationRouter {
    private customerRequester: ICustomerRequester;


    constructor(customerRequester: ICustomerRequester) {
        super();
        this.customerRequester = customerRequester;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/customerInfo', async (req: any, res: any) => {
            res.status(200).send(req.customer);
        });

        this.getRouter().get('/customer/bank', async (req: any, res: any) => {
            const customerBankId = req.customer.getDefaultBankCustomerId();
            const language = req.query.language;
            const customerBank = await this.customerRequester.getCustomerBankById(customerBankId, language);
            res.send(customerBank);
        });
    }
}