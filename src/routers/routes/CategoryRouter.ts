import ApplicationRouter from "./ApplicationRouter";
import ICategoryRequester from "../../business/requesters/ICategoryRequester";
import OnlyAdminStoreMiddleware from "../middlewares/OnlyAdminMiddleware";
import CategoryCreationDS from "../../business/models/datastores/CategoryCreationDS";

export default class CategoryRouter extends ApplicationRouter {
    private readonly categoryRequester: ICategoryRequester;

    constructor(categoryRequester: ICategoryRequester) {
        super();
        this.categoryRequester = categoryRequester;
    }

    public initRoutes(): void {
        this.getRouter().post('/category', new OnlyAdminStoreMiddleware().getRequestHandler(), async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const parentCategoryId = req.body.parentCategoryId;
            const categoryCreationDS = new CategoryCreationDS(nameFr, nameEn, parentCategoryId, customerId);
            await this.categoryRequester.addCategory(categoryCreationDS);
            res.send();
        });

        this.getRouter().get('/category', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const categories = await this.categoryRequester.getAllCategories(customerId);
            res.status(200).send(categories);
        });

        this.getRouter().get('/categoryFlat', async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const categoriesFlat = await this.categoryRequester.getAllCategoriesFlat(customerId);
            res.status(200).send(categoriesFlat);
        });

        this.getRouter().delete('/category/:categoryId', async(req: any, res: any) => {
            const categoryId = String(req.params.categoryId);
            const customerId = req.customer.getCustomerId();
            await this.categoryRequester.deleteCategory(categoryId, customerId);
            res.status(200).send();
        });
    }
}