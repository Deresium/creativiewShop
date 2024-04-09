import ApplicationRouter from "./ApplicationRouter";
import IDeliveryOptionRequester from "../../business/requesters/IDeliveryOptionRequester";
import {RequestHandler} from "express";
import DeliveryOptionUpdateDS from "../../business/models/datastores/DeliveryOptionUpdateDS";
import IDeliveryOptionCountryRequester from "../../business/requesters/IDeliveryOptionCountryRequester";
import ICountryRequester from "../../business/requesters/ICountryRequester";
import IWeightPriceRequester from "../../business/requesters/IWeightPriceRequester";
import WeightPriceDS from "../../business/models/datastores/WeightPriceDS";

export default class DeliveryOptionRouter extends ApplicationRouter {
    private readonly deliveryOptionRequester: IDeliveryOptionRequester;
    private readonly deliveryOptionCountryRequester: IDeliveryOptionCountryRequester;
    private readonly countryRequester: ICountryRequester;
    private readonly weightPriceRequester: IWeightPriceRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;
    private readonly checkDeliveryOptionOwnerMiddleware: RequestHandler;


    constructor(deliveryOptionRequester: IDeliveryOptionRequester, deliveryOptionCountryRequester: IDeliveryOptionCountryRequester, countryRequester: ICountryRequester, weightPriceRequester: IWeightPriceRequester, onlyAdminStoreMiddleware: RequestHandler, checkDeliveryOptionOwnerMiddleware: RequestHandler) {
        super();
        this.deliveryOptionRequester = deliveryOptionRequester;
        this.deliveryOptionCountryRequester = deliveryOptionCountryRequester;
        this.countryRequester = countryRequester;
        this.weightPriceRequester = weightPriceRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.checkDeliveryOptionOwnerMiddleware = checkDeliveryOptionOwnerMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/deliveryOption', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const deliveryOptionId = await this.deliveryOptionRequester.addDeliveryOption(customerId);
            res.send(deliveryOptionId);
        });

        this.getRouter().put('/deliveryOption/:deliveryOptionId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const customerId = req.customer.getCustomerId();
            const active = req.body.active;
            const nameFr = req.body.nameFr;
            const deliveryOptionUpdate = new DeliveryOptionUpdateDS(deliveryOptionId, customerId, active, nameFr);
            await this.deliveryOptionRequester.updateDeliveryOption(deliveryOptionUpdate);
            res.send();
        });

        this.getRouter().delete('/deliveryOption/:deliveryOptionId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const customerId = req.customer.getCustomerId();
            await this.deliveryOptionRequester.deleteDeliveryOption(deliveryOptionId, customerId);
            res.send();
        });

        this.getRouter().get('/deliveryOption/:deliveryOptionId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const customerId = req.customer.getCustomerId();
            const deliveryOption = await this.deliveryOptionRequester.getDeliveryOption(deliveryOptionId, customerId);
            res.send(deliveryOption);
        });

        this.getRouter().get('/deliveryOption', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const deliveryOptions = await this.deliveryOptionRequester.getDeliveryOptions(customerId);
            res.send(deliveryOptions);
        });

        this.getRouter().post('/deliveryOption/:deliveryOptionId/country/:countryId', this.onlyAdminStoreMiddleware, this.checkDeliveryOptionOwnerMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const countryId = Number(req.params.countryId);
            await this.deliveryOptionCountryRequester.addDeliveryOptionCountry(deliveryOptionId, countryId);
            res.send();
        });

        this.getRouter().delete('/deliveryOption/:deliveryOptionId/country/:countryId', this.onlyAdminStoreMiddleware, this.checkDeliveryOptionOwnerMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const countryId = Number(req.params.countryId);
            await this.deliveryOptionCountryRequester.deleteDeliveryOptionCountry(deliveryOptionId, countryId);
            res.send();
        });

        this.getRouter().get('/deliveryOption/:deliveryOptionId/country', this.onlyAdminStoreMiddleware, this.checkDeliveryOptionOwnerMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const countries = await this.deliveryOptionCountryRequester.getDeliveryOptionCountries(deliveryOptionId);
            res.send(countries);
        });

        this.getRouter().get('/country', async (req: any, res: any) => {
            const language = req.query.language;
            const countries = await this.countryRequester.getAllCountries(language);
            res.send(countries);
        });

        this.getRouter().post('/deliveryOption/:deliveryOptionId/weightPrice', this.onlyAdminStoreMiddleware, this.checkDeliveryOptionOwnerMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const gram = req.body.gram;
            const price = req.body.price;

            const weightPrice = new WeightPriceDS(deliveryOptionId, gram, price);
            await this.weightPriceRequester.addWeightPriceForDeliveryOption(weightPrice);
            res.send();
        });

        this.getRouter().get('/deliveryOption/:deliveryOptionId/weightPrice', this.onlyAdminStoreMiddleware, this.checkDeliveryOptionOwnerMiddleware, async (req: any, res: any) => {
            const deliveryOptionId = String(req.params.deliveryOptionId);
            const weightPrices = await this.weightPriceRequester.getWeightPriceForDeliveryOption(deliveryOptionId);
            res.send(weightPrices);
        });
    }
}