import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import path from "path";

export default class ReturnIndexMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }

    defineMiddlewareFunction(): RequestHandler {
        return (req, res, next) => {
            if (req.path.includes('/api/')) {
                next();
            } else {
                const publicDirectoryPath = path.join(__dirname, `../../public/vueapp`);
                res.sendFile(publicDirectoryPath + '/index.html');
            }
        }
    }
}