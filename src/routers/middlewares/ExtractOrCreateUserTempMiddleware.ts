import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import IUserRequester from "../../business/requesters/IUserRequester";

export default class ExtractOrCreateUserTempMiddleware extends ApplicationMiddleware{
    private readonly userRequester: IUserRequester;


    constructor(userRequester: IUserRequester) {
        super();
        this.userRequester = userRequester;
    }

    defineMiddlewareFunction(): RequestHandler {

        return async (req: any, res: any, next: any) => {
            // a logged-in user exists
            if(req.userId){
                next();
                return;
            }

            const cookies = cookie.parse(req.headers.cookie || '');
            const userTempToken = cookies.userTempToken;

            if (userTempToken) {
                try {
                    const decrypt = <any>jwt.verify(userTempToken, process.env.JWT_SECRET);
                    req.userId = decrypt.userTempId;
                    next();
                    return;
                }catch(error){
                    res.status(401).send();
                    return;
                }
            }

            const userId = await this.userRequester.createUserTemp(req.customer.getCustomerId(), req.language);
            const createUserTempToken = jwt.sign({
                userTempId: userId
            }, process.env.JWT_SECRET);

            const cookieUserTemp = cookie.serialize('userTempToken', createUserTempToken, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                path: '/'
            });

            res.setHeader('Set-Cookie', cookieUserTemp);
            next();
        }
    }

}