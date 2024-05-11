import IAddressRequester from "../../business/requesters/IAddressRequester";
import ApplicationRouter from "./ApplicationRouter";
import {RequestHandler} from "express";
import AddressCreationDS from "../../business/models/datastores/AddressCreationDS";

export default class AddressRouter extends ApplicationRouter {
    private readonly addressRequester: IAddressRequester;
    private readonly checkStoreAccessMiddleware: RequestHandler;
    private readonly extractOrCreateUserTempMiddleware: RequestHandler;


    constructor(addressRequester: IAddressRequester, checkStoreAccessMiddleware: RequestHandler, extractOrCreateUserTempMiddleware: RequestHandler) {
        super();
        this.addressRequester = addressRequester;
        this.checkStoreAccessMiddleware = checkStoreAccessMiddleware;
        this.extractOrCreateUserTempMiddleware = extractOrCreateUserTempMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/address', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, async (req: any, res: any, next: any) => {
            try {
                const userId = req.userId;
                const language = req.query.language;
                if (!userId) {
                    res.status(400).send();
                    return;
                }
                const addresses = await this.addressRequester.getAddressesForUser(userId, language);
                res.status(200).send(addresses);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/address/:addressId', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, async (req: any, res: any, next: any) => {
            try {
                const userId = req.userId;
                const language = req.query.language;
                const addressId = String(req.params.addressId);
                if (!userId) {
                    res.status(400).send();
                    return;
                }
                const address = await this.addressRequester.getAddress(addressId, userId, language);
                res.status(200).send(address);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().post('/address', this.checkStoreAccessMiddleware, this.extractOrCreateUserTempMiddleware, async (req: any, res: any, next: any) => {
            try {
                const userId = req.userId;
                const countryId = req.body.countryId;
                const street = req.body.street;
                const city = req.body.city;
                const streetNumber = req.body.streetNumber;
                const box = req.body.box;
                const zipCode = req.body.zipCode;
                const addressCreationDS = new AddressCreationDS(countryId, userId, city, street, streetNumber, box, zipCode);
                const addressId = await this.addressRequester.addAddress(addressCreationDS);
                res.send(addressId);
            } catch (error) {
                next(error);
            }
        });
    }
}