import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import GroupConst from "../../business/utils/GroupConst";

export default class OnlyAdminGlobalMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            if (GroupConst.hasAccessTo(GroupConst.ADMIN_GLOBAL, req.userGroups)) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }

}