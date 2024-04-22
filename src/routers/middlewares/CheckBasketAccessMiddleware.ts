import {RequestHandler} from "express";
import IBasketRequester from "../../business/requesters/IBasketRequester";
import GroupConst from "../../business/utils/GroupConst";
import ApplicationMiddleware from "./ApplicationMiddleware";

export default class CheckBasketAccessMiddleware extends ApplicationMiddleware {
    private readonly basketRequester: IBasketRequester;


    constructor(basketRequester: IBasketRequester) {
        super();
        this.basketRequester = basketRequester;
    }

    defineMiddlewareFunction(): RequestHandler {
        return async(req: any, res: any, next: any) => {
            if (GroupConst.hasAccessTo(GroupConst.ADMIN_STORE, req.userGroups)) {
                next();
                return;
            }

            if(!req.params.basketId){
                res.status(400).send();
                return;
            }

            const isBasketOwner = await this.basketRequester.isBasketOwner(String(req.params.basketId), req.userId);

            if(isBasketOwner){
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }
}