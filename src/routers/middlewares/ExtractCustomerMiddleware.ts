import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import CustomerCacheSingleton from "../../business/cache/CustomerCacheSingleton";

export default class ExtractCustomerMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            let dnsName = req.get('host').split(':')[0];
            if (dnsName.startsWith('www.')) {
                dnsName = dnsName.replace('www.', '');
            }
            req.customer = CustomerCacheSingleton.getInstance().getCustomer(dnsName);
            next();
        }
    }
}