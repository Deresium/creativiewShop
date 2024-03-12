import ApplicationRouter from "./ApplicationRouter";
import IGeographicZoneRequester from "../../business/requesters/IGeographicZoneRequester";
import {RequestHandler} from "express";
import GeographicZoneUpdateDS from "../../business/models/datastores/GeographicZoneUpdateDS";
import IGeographicZoneCountryRequester from "../../business/requesters/IGeographicZoneCountryRequester";
import ICountryRequester from "../../business/requesters/ICountryRequester";
import IWeightPriceRequester from "../../business/requesters/IWeightPriceRequester";
import WeightPriceDS from "../../business/models/datastores/WeightPriceDS";

export default class GeographicZoneRouter extends ApplicationRouter {
    private readonly geographicZoneRequester: IGeographicZoneRequester;
    private readonly geographicZoneCountryRequester: IGeographicZoneCountryRequester;
    private readonly countryRequester: ICountryRequester;
    private readonly weightPriceRequester: IWeightPriceRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;
    private readonly checkGeographicZoneOwnerMiddleware: RequestHandler;


    constructor(geographicZoneRequester: IGeographicZoneRequester, geographicZoneCountryRequester: IGeographicZoneCountryRequester, countryRequester: ICountryRequester, weightPriceRequester: IWeightPriceRequester, onlyAdminStoreMiddleware: RequestHandler, checkGeographicZoneOwnerMiddleware: RequestHandler) {
        super();
        this.geographicZoneRequester = geographicZoneRequester;
        this.geographicZoneCountryRequester = geographicZoneCountryRequester;
        this.countryRequester = countryRequester;
        this.weightPriceRequester = weightPriceRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.checkGeographicZoneOwnerMiddleware = checkGeographicZoneOwnerMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/geographicZone', this.onlyAdminStoreMiddleware, async(req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const geographicZoneId = await this.geographicZoneRequester.addGeographicZone(customerId);
            res.send(geographicZoneId);
        });

        this.getRouter().put('/geographicZone/:geographicZoneId', this.onlyAdminStoreMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const customerId = req.customer.getCustomerId();
            const active = req.body.active;
            const name = req.body.name;
            const geographicZoneUpdate = new GeographicZoneUpdateDS(geographicZoneId, customerId, active, name);
            await this.geographicZoneRequester.updateGeographicZone(geographicZoneUpdate);
            res.send();
        });

        this.getRouter().delete('/geographicZone/:geographicZoneId', this.onlyAdminStoreMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const customerId = req.customer.getCustomerId();
            await this.geographicZoneRequester.deleteGeographicZone(geographicZoneId, customerId);
            res.send();
        });

        this.getRouter().get('/geographicZone/:geographicZoneId', this.onlyAdminStoreMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const customerId = req.customer.getCustomerId();
            const geographicZone = await this.geographicZoneRequester.getGeographicZone(geographicZoneId, customerId);
            res.send(geographicZone);
        });

        this.getRouter().post('/geographicZone/:geographicZoneId/country/:countryId', this.onlyAdminStoreMiddleware, this.checkGeographicZoneOwnerMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const countryId = Number(req.params.countryId);
            await this.geographicZoneCountryRequester.addGeographicZoneCountry(geographicZoneId, countryId);
            res.send();
        });

        this.getRouter().delete('/geographicZone/:geographicZoneId/country/:countryId', this.onlyAdminStoreMiddleware, this.checkGeographicZoneOwnerMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const countryId = Number(req.params.countryId);
            await this.geographicZoneCountryRequester.deleteGeographicZoneCountry(geographicZoneId, countryId);
            res.send();
        });

        this.getRouter().get('/geographicZone/:geographicZoneId/country', this.onlyAdminStoreMiddleware, this.checkGeographicZoneOwnerMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const countries = await this.geographicZoneCountryRequester.getGeographicZoneCountries(geographicZoneId);
            res.send(countries);
        });

        this.getRouter().get('/country', async(req: any, res: any) => {
            const countries = await this.countryRequester.getAllCountries();
            res.send(countries);
        });

        this.getRouter().post('/geographicZone/:geographicZoneId/weightPrice', this.onlyAdminStoreMiddleware, this.checkGeographicZoneOwnerMiddleware, async(req: any, res: any)=> {
            const geographicZoneId = String(req.params.geographicZoneId);
            const gram = req.body.gram;
            const price = req.body.price;

            const weightPrice = new WeightPriceDS(geographicZoneId, gram, price);
            await this.weightPriceRequester.addWeightPriceForGeographicZone(weightPrice);
            res.send();
        });

        this.getRouter().get('/geographicZone/:geographicZoneId/weightPrice', this.onlyAdminStoreMiddleware, this.checkGeographicZoneOwnerMiddleware, async(req: any, res: any) => {
            const geographicZoneId = String(req.params.geographicZoneId);
            const weightPrices = await this.weightPriceRequester.getWeightPriceForGeographicZone(geographicZoneId);
            res.send(weightPrices);
        });
    }
}