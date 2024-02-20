import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";

export default class RedirectHttpsMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            if (req.header('x-forwarded-proto') !== 'https')
                res.redirect(`https://${req.hostname}${req.url}`);
            else if (!req.hostname.startsWith('www.'))
                res.redirect(`https://www.${req.hostname}${req.url}`);
            else
                next();
        };
    }
}