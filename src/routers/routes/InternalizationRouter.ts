import ApplicationRouter from "./ApplicationRouter";
import IInternalizationRequester from "../../business/requesters/IInternalizationRequester";

export default class InternalizationRouter extends ApplicationRouter {
    private readonly internalizationRequester: IInternalizationRequester;

    constructor(internalizationRequester: IInternalizationRequester) {
        super();
        this.internalizationRequester = internalizationRequester;
        this.initRoutes();
    }

    public initRoutes() {

        this.getRouter().get('/internalizationMessages', async (req: any, res: any, next: any) => {
            try {
                res.status(200).send(await this.internalizationRequester.getInternalizationMessagesForCustomer(req.customer.getCustomerId()));
            } catch (error) {
                next(error);
            }
        });
    }
}