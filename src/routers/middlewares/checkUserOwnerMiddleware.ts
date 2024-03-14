import ApplicationMiddleware from "./ApplicationMiddleware";
import IUserRequester from "../../business/requesters/IUserRequester";
import {RequestHandler} from "express";

export default class CheckUserOwnerMiddleware extends ApplicationMiddleware {
    private readonly userRequester: IUserRequester;


    constructor(userRequester: IUserRequester) {
        super();
        this.userRequester = userRequester;
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const userId = String(req.params.userId);
            const customerId = req.customer.getCustomerId();
            const userExists = await this.userRequester.userExistsForCustomer(userId, customerId);
            if (userExists) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }
}