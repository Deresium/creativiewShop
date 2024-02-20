import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";

export default class OnlyAdminMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            if (req.userRole === 'ADMIN') {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }

}