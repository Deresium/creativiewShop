import ApplicationRouter from "./ApplicationRouter";
import IManufacturerRequester from "../../business/requesters/IManufacturerRequester";
import ManufacturerDS from "../../business/models/datastores/ManufacturerDS";
import ManufacturerUpdateDS from "../../business/models/datastores/ManufacturerUpdateDS";
import {RequestHandler} from "express";

export default class ManufacturerRouter extends ApplicationRouter {
    private readonly manufacturerRequester: IManufacturerRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;


    constructor(manufacturerRequester: IManufacturerRequester, onlyAdminStoreMiddleware: RequestHandler) {
        super();
        this.manufacturerRequester = manufacturerRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }

    public initRoutes(): void {
        this.getRouter().post('/manufacturer', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const name = req.body.name;
            const manufacturer = new ManufacturerDS(name, customerId);
            await this.manufacturerRequester.addManufacturer(manufacturer);
            res.send();
        });

        this.getRouter().put('/manufacturer/:manufacturerId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const manufacturerId = String(req.params.manufacturerId);
            const customerId = req.customer.getCustomerId();
            const name = req.body.name;

            const manufacturer = new ManufacturerUpdateDS(name, customerId, manufacturerId);
            await this.manufacturerRequester.updateManufacturer(manufacturer);
            res.send();
        });

        this.getRouter().delete('/manufacturer/:manufacturerId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const manufacturerId = String(req.params.manufacturerId);
            const customerId = req.customer.getCustomerId();

            await this.manufacturerRequester.removeManufacturer(manufacturerId, customerId);
            res.send();
        });

        this.getRouter().get('/manufacturer', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const manufacturers = await this.manufacturerRequester.getAllManufacturer(customerId);
            res.status(200).send(manufacturers);
        });

        this.getRouter().get('/manufacturer/:manufacturerId', async (req: any, res: any) => {
            const manufacturerId = String(req.params.manufacturerId);
            const customerId = req.customer.getCustomerId();
            const manufacturer = await this.manufacturerRequester.getManufacturerById(manufacturerId, customerId);
            res.status(200).send(manufacturer);
        });
    }
}