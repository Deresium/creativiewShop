import ApplicationRouter from "./ApplicationRouter";
import StoreAccess from "../../business/utils/StoreAccess";

export default class StoreRouter extends ApplicationRouter {
    constructor() {
        super();
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/store/storeAccess', async (req: any, res: any) => {
            const hasAccessToStore = StoreAccess.hasAccessToStore(req.userId, req.customer.getStoreProtectionCode());
            res.send(hasAccessToStore);
        });
    }
}