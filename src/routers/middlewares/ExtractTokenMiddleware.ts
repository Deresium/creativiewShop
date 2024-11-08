import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import {parse} from "cookie";
import jwt from "jsonwebtoken"
import CookiesGenerator from "../../business/utils/CookiesGenerator";

export default class ExtractTokenMiddleware extends ApplicationMiddleware {
    constructor() {
        super();
    }


    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            const cookies = parse(req.headers.cookie || '');
            const sign = cookies.signature;
            const payload = cookies.payload;
            if (sign && payload) {
                const token = `${payload}.${sign}`;
                try {
                    const decrypt = <any>jwt.verify(token, process.env.JWT_SECRET);
                    req.userGroups = decrypt.userGroups;
                    req.userId = decrypt.userId;
                    const cookieGenerator = new CookiesGenerator(req.userId, req.userGroups);
                    res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
                } catch (error) {
                    console.error(error);
                    res.status(401).send();
                    return;
                }
            }
            next();
        }
    }

}