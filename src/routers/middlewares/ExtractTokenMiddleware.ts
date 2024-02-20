import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken"
import CookiesGenerator from "../../business/utils/CookiesGenerator";

export default class ExtractTokenMiddleware extends ApplicationMiddleware{
    constructor() {
        super();
    }


    defineMiddlewareFunction(): RequestHandler {
        return (req: any, res: any, next: any) => {
            const cookies = cookie.parse(req.headers.cookie || '');
            const sign = cookies.signature;
            const payload = cookies.payload;
            if(sign && payload) {
                const token = `${payload}.${sign}`;
                const decrypt = <any>jwt.verify(token, process.env.JWT_SECRET);
                req.userRole = decrypt.role;
                req.userId = decrypt.userId;
                const cookieGenerator = new CookiesGenerator(req.userId, req.userRole);
                res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
            }
            next();
        }
    }

}