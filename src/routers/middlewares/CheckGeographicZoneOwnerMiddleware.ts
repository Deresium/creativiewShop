import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import IProductRequester from "../../business/requesters/IProductRequester";
import IGeographicZoneRequester from "../../business/requesters/IGeographicZoneRequester";

export default class CheckGeographicZoneOwnerMiddleware extends ApplicationMiddleware {
    private readonly geographicZoneRequester: IGeographicZoneRequester;

    constructor(geographicZoneRequester: IGeographicZoneRequester) {
        super();
        this.geographicZoneRequester = geographicZoneRequester;
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const customerId = req.customer.getCustomerId();
            const geographicZoneExists = await this.geographicZoneRequester.geographicZoneExistsForCustomer(geographicZoneId, customerId);
            if (geographicZoneExists) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        }
    }
}