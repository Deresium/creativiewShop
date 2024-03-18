import ApplicationRouter from "./ApplicationRouter";
import IGroupRequester from "../../business/requesters/IGroupRequester";
import {RequestHandler} from "express";

export default class GroupRouter extends ApplicationRouter {
    private readonly groupRequester: IGroupRequester;
    private readonly onlyAdminMiddleware: RequestHandler;

    constructor(groupRequester: IGroupRequester, onlyAdminMiddleware: RequestHandler) {
        super();
        this.groupRequester = groupRequester;
        this.onlyAdminMiddleware = onlyAdminMiddleware;
        this.initRoutes();
    }

    public initRoutes(): void {
        this.getRouter().get('/groupDiscount', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const groups = await this.groupRequester.getDiscountGroupsForCustomer(customerId);
            res.send(groups);
        });
    }


}