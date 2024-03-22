import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import StoreAccess from "../../business/utils/StoreAccess";

export default class CheckStoreAccessMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const access = StoreAccess.hasAccessToStore(req.userId, req.customer.getStoreProtectionCode());
            if (access) {
                next();
            } else {
                res.status(401).send('Accès refusé');
            }
        }

    }
}