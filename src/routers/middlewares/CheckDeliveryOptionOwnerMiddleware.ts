import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import IDeliveryOptionRequester from "../../business/requesters/IDeliveryOptionRequester";

export default class CheckDeliveryOptionOwnerMiddleware extends ApplicationMiddleware {
    private readonly deliveryOptionRequester: IDeliveryOptionRequester;

    constructor(deliveryOptionRequester: IDeliveryOptionRequester) {
        super();
        this.deliveryOptionRequester = deliveryOptionRequester;
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const customerId = req.customer.getCustomerId();
            const deliveryOptionExists = await this.deliveryOptionRequester.deliveryOptionExistsForCustomer(deliveryOptionId, customerId);
            if (deliveryOptionExists) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }
}