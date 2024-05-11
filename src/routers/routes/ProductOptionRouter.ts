import ApplicationRouter from "./ApplicationRouter";
import IProductOptionRequester from "../../business/requesters/IProductOptionRequester";
import e, {RequestHandler} from "express";
import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";
import IProductOptionPriceRequester from "../../business/requesters/IProductOptionPriceRequester";
import IProductOptionCategoryRequester from "../../business/requesters/IProductOptionCategoryRequester";
import IProductOptionPictureRequester from "../../business/requesters/IProductOptionPictureRequester";
import multer from "multer";
import ProductOptionDiscountDS from "../../business/models/datastores/ProductOptionDiscountDS";
import IProductOptionDiscountRequester from "../../business/requesters/IProductOptionDiscountRequester";
import Decimal from "decimal.js";

export default class ProductOptionRouter extends ApplicationRouter {
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly productOptionPriceRequester: IProductOptionPriceRequester;
    private readonly productOptionCategoryRequester: IProductOptionCategoryRequester;
    private readonly productOptionPictureRequester: IProductOptionPictureRequester;
    private readonly productOptionDiscountRequester: IProductOptionDiscountRequester;
    private readonly onlyAdminStoreMiddleware: RequestHandler;
    private readonly checkProductOwnerMiddleware: RequestHandler;


    constructor(productOptionRequester: IProductOptionRequester, productOptionPriceRequester: IProductOptionPriceRequester, productOptionCategoryRequester: IProductOptionCategoryRequester, productOptionPictureRequester: IProductOptionPictureRequester, productOptionDiscountRequester: IProductOptionDiscountRequester, onlyAdminStoreMiddleware: e.RequestHandler, checkProductOwnerMiddleware: e.RequestHandler) {
        super();
        this.productOptionRequester = productOptionRequester;
        this.productOptionPriceRequester = productOptionPriceRequester;
        this.productOptionCategoryRequester = productOptionCategoryRequester;
        this.productOptionPictureRequester = productOptionPictureRequester;
        this.productOptionDiscountRequester = productOptionDiscountRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.checkProductOwnerMiddleware = checkProductOwnerMiddleware;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().post('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productId = String(req.params.productId);
                const productOptionId = await this.productOptionRequester.createProductOption(productId);
                res.send(productOptionId);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productId = String(req.params.productId);
                const productOptions = await this.productOptionRequester.getProductOptionByProduct(productId);
                res.send(productOptions);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const productOption = await this.productOptionRequester.getProductOption(productOptionId);
                res.send(productOption);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().put('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const code = req.body.code;
                const nameFr = req.body.nameFr;
                const nameEn = req.body.nameEn;
                const stock = req.body.stock;
                const weight = String(req.body.weight);
                const active = req.body.active;
                const preorder = req.body.preorder;
                const featured = req.body.featured;

                const productOptionUpdateDs = new ProductOptionUpdateDS(productOptionId, code, nameFr, nameEn, weight, stock, active, preorder, featured);
                await this.productOptionRequester.updateProductOption(productOptionUpdateDs);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                await this.productOptionRequester.deleteProductOption(productOptionId);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/price', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const prices = await this.productOptionPriceRequester.getPricesForProductOption(productOptionId);
                res.send(prices);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().post('/product/:productId/productOption/:productOptionId/price', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const price = req.body.price;
                await this.productOptionPriceRequester.updatePrice(productOptionId, price);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/category', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const categoriesId = await this.productOptionCategoryRequester.getProductOptionCategoriesId(productOptionId);
                res.send(categoriesId);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().put('/product/:productId/productOption/:productOptionId/category', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const categoriesId = req.body.categoriesId;
                await this.productOptionCategoryRequester.replaceCategories(productOptionId, categoriesId);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        const upload = multer();
        this.getRouter().post('/product/:productId/productOption/:productOptionId/image', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, upload.single('file'), async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const image = req.file.buffer;
                const imageName = req.file.originalname;
                await this.productOptionPictureRequester.addProductOptionPicture(image, productOptionId, imageName);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId/image/:productOptionImageId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionImageId = String(req.params.productOptionImageId);
                await this.productOptionPictureRequester.deleteProductOptionPicture(productOptionImageId);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/image', async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const productOptionPicturesId = await this.productOptionPictureRequester.getPicturesForProductOption(productOptionId);
                res.send(productOptionPicturesId);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().post('/product/:productId/productOption/:productOptionId/discount', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            const productOptionId = String(req.params.productOptionId);
            const groupId = req.body.groupId;
            const percent = String(req.body.percent);
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);
            const productOptionDiscount = new ProductOptionDiscountDS(productOptionId, groupId, percent, startDate, endDate);
            try {
                await this.productOptionDiscountRequester.addProductOptionDiscount(productOptionDiscount);
                res.send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId/discount/:productOptionDiscountId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionDiscountId = String(req.params.productOptionDiscountId);
                await this.productOptionDiscountRequester.deleteProductOptionDiscount(productOptionDiscountId);
                res.send();
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/discount', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const discounts = await this.productOptionDiscountRequester.getDiscountsForProductOption(productOptionId);
                res.send(discounts);
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/percentCalculator', async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const discountPrice = new Decimal(req.query.discountPrice);
                const percent = await this.productOptionPriceRequester.calculatePercentForProductOption(productOptionId, discountPrice);
                res.send({percent: percent});
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/lastPrice', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any, next: any) => {
            try {
                const productOptionId = String(req.params.productOptionId);
                const price = await this.productOptionPriceRequester.getLastPriceForProductOption(productOptionId);
                res.send({price: price});
            } catch (error) {
                next(error);
            }
        });
    }
}