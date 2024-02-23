import ApplicationRouter from "./ApplicationRouter";
import IInternalizationRequester from "../../business/requesters/IInternalizationRequester";

export default class InternalizationRouter extends ApplicationRouter {
    private readonly internalizationRequester: IInternalizationRequester;

    constructor(internalizationRequester: IInternalizationRequester) {
        super();
        this.internalizationRequester = internalizationRequester;
    }

    public initRoutes() {
        this.getRouter().get('/internalizationMessages', async (req: any, res: any) => {
            res.status(200).send(await this.internalizationRequester.getInternalizationMessagesForCustomer(req.customer.getCustomerId()));
        });
    }
}