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
        this.getRouter().post('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const productOptionId = await this.productOptionRequester.createProductOption(productId);
            res.send(productOptionId);
        });

        this.getRouter().get('/product/:productId/productOption', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productId = String(req.params.productId);
            const productOptions = await this.productOptionRequester.getProductOptionByProduct(productId);
            res.send(productOptions);
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const productOption = await this.productOptionRequester.getProductOption(productOptionId);
            res.send(productOption);
        });

        this.getRouter().put('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const code = req.body.code;
            const nameFr = req.body.nameFr;
            const nameEn = req.body.nameEn;
            const stock = req.body.stock;
            const weight = req.body.weight;
            const active = req.body.active;
            const preorder = req.body.preorder;
            const featured = req.body.featured;

            const productOptionUpdateDs = new ProductOptionUpdateDS(productOptionId, code, nameFr, nameEn, weight, stock, active, preorder, featured);
            await this.productOptionRequester.updateProductOption(productOptionUpdateDs);
            res.send();
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            await this.productOptionRequester.deleteProductOption(productOptionId);
            res.send();
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/price', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const prices = await this.productOptionPriceRequester.getPricesForProductOption(productOptionId);
            res.send(prices);
        });

        this.getRouter().post('/product/:productId/productOption/:productOptionId/price', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const price = req.body.price;
            await this.productOptionPriceRequester.updatePrice(productOptionId, price);
            res.send();
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/category', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const categoriesId = await this.productOptionCategoryRequester.getProductOptionCategoriesId(productOptionId);
            res.send(categoriesId);
        });

        this.getRouter().put('/product/:productId/productOption/:productOptionId/category', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const categoriesId = req.body.categoriesId;
            await this.productOptionCategoryRequester.replaceCategories(productOptionId, categoriesId);
            res.send();
        });

        const upload = multer();
        this.getRouter().post('/product/:productId/productOption/:productOptionId/image', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, upload.single('file'), async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const image = req.file.buffer;
            const imageName = req.file.originalname;
            await this.productOptionPictureRequester.addProductOptionPicture(image, productOptionId, imageName);
            res.send();
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId/image/:productOptionImageId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async (req: any, res: any) => {
            const productOptionImageId = String(req.params.productOptionImageId);
            await this.productOptionPictureRequester.deleteProductOptionPicture(productOptionImageId);
            res.send();
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/image', async (req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const productOptionPicturesId = await this.productOptionPictureRequester.getPicturesForProductOption(productOptionId);
            res.send(productOptionPicturesId);
        });

        this.getRouter().post('/product/:productId/productOption/:productOptionId/discount', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async(req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const groupId = req.body.groupId;
            const percent = req.body.percent;
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const productOptionDiscount = new ProductOptionDiscountDS(productOptionId, groupId, percent, startDate, endDate);
            await this.productOptionDiscountRequester.addProductOptionDiscount(productOptionDiscount);
            res.send();
        });

        this.getRouter().delete('/product/:productId/productOption/:productOptionId/discount/:productOptionDiscountId', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async(req: any, res: any) => {
            const productOptionDiscountId = String(req.params.productOptionDiscountId);
            await this.productOptionDiscountRequester.deleteProductOptionDiscount(productOptionDiscountId);
            res.send();
        });

        this.getRouter().get(' /product/:productId/productOption/:productOptionId/discount', this.onlyAdminStoreMiddleware, this.checkProductOwnerMiddleware, async(req: any, res: any) => {
            const productOptionId = String(req.params.productOptionId);
            const discounts = await this.productOptionDiscountRequester.getDiscountsForProductOption(productOptionId);
            res.send(discounts);
        });
    }
}