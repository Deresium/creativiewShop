import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";


export default class ErrorHandlerMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    public defineMiddlewareFunction(): RequestHandler {
        return (err: any, req: any, res: any, next: any) => {
            console.error(err.stack);
            res.status(500).send();
        }
    }
}