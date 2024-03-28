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
            console.error('No USER ID found when exract basket id middleware');
            res.status(500).send();
        }
    }
}