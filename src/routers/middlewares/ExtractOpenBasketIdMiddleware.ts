import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import IBasketRequester from "../../business/requesters/IBasketRequester";
import cookie from "cookie";
import jwt from "jsonwebtoken"

export default class ExtractOpenBasketIdMiddleware extends ApplicationMiddleware {
    private readonly basketRequester: IBasketRequester;


    constructor(basketRequester: IBasketRequester) {
        super();
        this.basketRequester = basketRequester;
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            if (req.userId) {
                req.basketId = await this.basketRequester.addOpenBasketIfNotExists(req.userId);
                next();
                return;
            }

            const cookies = cookie.parse(req.headers.cookie || '');
            const basketIdToken = cookies.basketToken;
            if (basketIdToken) {
                try {
                    const decrypt = <any>jwt.verify(basketIdToken, process.env.JWT_SECRET);
                    const basketId = decrypt.basketId;
                    if(!await this.basketRequester.isOpenBasket(basketId)){
                        res.status(400).send();
                    }
                    req.basketId = basketId;
                    next();
                    return;
                }catch(error){
                    res.status(401).send();
                    return;
                }
            }

            const basketId = await this.basketRequester.addOpenBasket();

            const tokenBasketId = jwt.sign({
                basketId: basketId
            }, process.env.JWT_SECRET);

            const cookieBasket = cookie.serialize('basketToken', tokenBasketId, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                path: '/'
            });

            res.setHeader('Set-Cookie', cookieBasket);

            next();
        }
    }
}