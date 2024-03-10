import ApplicationRouter from "./ApplicationRouter";
import IProductRequester from "../../business/requesters/IProductRequester";
import ProductUpdateDS from "../../business/models/datastores/ProductUpdateDS";
import {RequestHandler} from "express";

export default class ProductRouter extends ApplicationRouter {
    private readonly productRequester: IProductRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;


    constructor(productRequester: IProductRequester, onlyAdminStoreMiddleware: RequestHandler) {
        super();
        this.productRequester = productRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/product', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const productId = await this.productRequester.createProduct(customerId);
            res.send(productId);
        });

        this.getRouter().delete('/product/:productId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            await this.productRequester.deleteProduct(productId, customerId);
            res.send();
        });

        this.getRouter().put('/product/:productId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();
            const manufacturerId = req.body.manufacturerId;
            const code = req.body.code;
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const descriptionFr = req.body.descriptionFr;
            const descriptionEn = req.body.descriptionEn;

            const productUpdateDS = new ProductUpdateDS(productId, customerId, manufacturerId, code, nameFr, nameEn, descriptionFr, descriptionEn);
            await this.productRequester.updateProduct(productUpdateDS);
            res.send();
        });

        this.getRouter().get('/product/:productId', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const customerId = req.customer.getCustomerId();

            const product = await this.productRequester.getProduct(productId, customerId);
            res.status(200).send(product);
        });

        this.getRouter().get('/product', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const products = await this.productRequester.getAllProduct(customerId);
            res.status(200).send(products);
        });

        this.getRouter().get('/productListAdmin', this.onlyAdminStoreMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const products = await this.productRequester.getListAdminProducts(customerId);
            res.status(200).send(products);
        });
    }
}