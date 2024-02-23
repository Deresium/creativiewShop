import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";

export default class ExtractLanguageMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            req.language = req.query.language;
            next();
        }
    }
}