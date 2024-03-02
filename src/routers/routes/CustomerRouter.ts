import ApplicationRouter from "./ApplicationRouter";

export default class CustomerRouter extends ApplicationRouter {


    constructor() {
        super();
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/customerInfo', async (req: any, res: any) => {
            res.status(200).send(req.customer);
        });
    }
}