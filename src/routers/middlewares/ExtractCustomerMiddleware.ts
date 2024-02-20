import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import CustomerCacheSingleton from "../../business/cache/CustomerCacheSingleton";

export default class ExtractCustomerMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            const dnsName = req.get('host').split(':')[0];
            req.customerId = CustomerCacheSingleton.getInstance().getCustomer(dnsName).getCustomerId();
            next();
        }
    }
}