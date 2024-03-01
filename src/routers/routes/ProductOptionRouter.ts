import ApplicationRouter from "./ApplicationRouter";
import IProductOptionRequester from "../../business/requesters/IProductOptionRequester";
import OnlyAdminStoreMiddleware from "../middlewares/OnlyAdminMiddleware";
import CheckProductOwnerMiddleware from "../middlewares/CheckProductOwnerMiddleware";
import IProductRequester from "../../business/requesters/IProductRequester";

export default class ProductOptionRouter extends ApplicationRouter {
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly productRequester: IProductRequester;

    constructor(productOptionRequester: IProductOptionRequester, productRequester: IProductRequester) {
        super();
        this.productOptionRequester = productOptionRequester;
        this.productRequester = productRequester;
    }

    public initRoutes() {
        this.getRouter().post('/product/:productId/productOption', new OnlyAdminStoreMiddleware().getRequestHandler(), new CheckProductOwnerMiddleware(this.productRequester).getRequestHandler(), async (req: any, res: any) => {
            const productId = String(req.params.productId);

            await this.productOptionRequester.createProductOption(productId);
        });
    }
}