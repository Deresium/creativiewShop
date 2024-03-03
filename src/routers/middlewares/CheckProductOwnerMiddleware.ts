import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import IProductRequester from "../../business/requesters/IProductRequester";

export default class CheckProductOwnerMiddleware extends ApplicationMiddleware {
    private readonly productRequester: IProductRequester;

    constructor(productRequester: IProductRequester) {
        super();
        this.productRequester = productRequester;
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            const productExists = await this.productRequester.productExistsForCustomer(productId, customerId);
            if (productExists) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }
}