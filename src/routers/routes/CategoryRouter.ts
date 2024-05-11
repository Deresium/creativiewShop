import ApplicationRouter from "./ApplicationRouter";
import ICategoryRequester from "../../business/requesters/ICategoryRequester";
import CategoryCreationDS from "../../business/models/datastores/CategoryCreationDS";
import CategoryUpdateDS from "../../business/models/datastores/CategoryUpdateDS";
import multer from "multer";
import {RequestHandler} from "express";

export default class CategoryRouter extends ApplicationRouter {
    private readonly categoryRequester: ICategoryRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;


    constructor(categoryRequester: ICategoryRequester, onlyAdminStoreMiddleware: RequestHandler) {
        super();
        this.categoryRequester = categoryRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }

    public initRoutes(): void {
        this.getRouter().post('/category', this.onlyAdminStoreMiddleware, async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const nameFr = req.body.nameFr;
                const nameEn = req.body.nameEn;
                const parentCategoryId = req.body.parentCategoryId;
                const categoryCreationDS = new CategoryCreationDS(nameFr, nameEn, parentCategoryId, customerId);
                await this.categoryRequester.addCategory(categoryCreationDS);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/category', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const categories = await this.categoryRequester.getAllCategories(customerId);
                res.status(200).send(categories);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/categoryFlat', async (req: any, res: any, next: any) => {
            try {
                const customerId = req.customer.getCustomerId();
                const categoriesFlat = await this.categoryRequester.getAllCategoriesFlat(customerId);
                res.status(200).send(categoriesFlat);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().delete('/category/:categoryId', this.onlyAdminStoreMiddleware, async (req: any, res: any, next: any) => {
            try {
                const categoryId = String(req.params.categoryId);
                const customerId = req.customer.getCustomerId();
                await this.categoryRequester.deleteCategory(categoryId, customerId);
                res.status(200).send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().put('/category/:categoryId', this.onlyAdminStoreMiddleware, async (req: any, res: any, next: any) => {
            try {
                const categoryId = String(req.params.categoryId);
                const customerId = req.customer.getCustomerId();
                const nameFr = req.body.nameFr;
                const nameEn = req.body.nameEn;
                const parentCategoryId = req.body.parentCategoryId;
                const categoryUpdateDS = new CategoryUpdateDS(nameFr, nameEn, parentCategoryId, categoryId, customerId);
                await this.categoryRequester.updateCategory(categoryUpdateDS);
                res.status(200).send();
            } catch (error) {
                next(error);
            }
        });

        const upload = multer();
        this.getRouter().put('/category/image/:categoryId', this.onlyAdminStoreMiddleware, upload.single('file'), async (req: any, res: any, next: any) => {
            try {
                const categoryId = String(req.params.categoryId);
                const customerId = req.customer.getCustomerId();
                const image = req.file.buffer;
                const imageName = req.file.originalname;
                await this.categoryRequester.updateCategoryImage(image, imageName, categoryId, customerId);
                res.status(200).send();
            } catch (error) {
                next(error);
            }
        });
    }
}