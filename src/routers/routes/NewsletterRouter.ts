import ApplicationRouter from "./ApplicationRouter";
import INewsletterRequester from "../../business/requesters/INewsletterRequester";
import {RequestHandler} from "express";
import NewsletterCreationDS from "../../business/models/datastores/NewsletterCreationDS";

export default class NewsletterRouter extends ApplicationRouter {
    private newsletterRequester: INewsletterRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;


    constructor(newsletterRequester: INewsletterRequester, onlyAdminStoreMiddleware: RequestHandler) {
        super();
        this.newsletterRequester = newsletterRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/newsletter', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customer = req.customer;
            const object = req.body.object;
            const content = req.body.content;
            const userIds = req.body.userIds;
            const groupIds = req.body.groupIds;
            const sendToAllUsers = req.body.sendToAllUsers;
            const newsletterCreation = new NewsletterCreationDS(customer, object, content, userIds, groupIds, sendToAllUsers);

            try {
                await this.newsletterRequester.createNewsletter(newsletterCreation);
                res.send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });
    }
}