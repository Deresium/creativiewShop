import ApplicationRouter from "./ApplicationRouter";
import ICategoryRequester from "../../business/requesters/ICategoryRequester";
import IProductOptionPictureRequester from "../../business/requesters/IProductOptionPictureRequester";

export default class PublicFileRouter extends ApplicationRouter {
    private readonly categoryRequester: ICategoryRequester;
    private readonly productOptionPictureRequester: IProductOptionPictureRequester;


    constructor(categoryRequester: ICategoryRequester, productOptionPictureRequester: IProductOptionPictureRequester) {
        super();
        this.categoryRequester = categoryRequester;
        this.productOptionPictureRequester = productOptionPictureRequester;
        this.initRoutes();
    }

    public initRoutes() {
        this.getRouter().get('/category/:categoryId', async (req: any, res: any, next: any) => {
            try {
                const categoryId = String(req.params.categoryId);
                const customerId = req.customer.getCustomerId();
                const fileVM = await this.categoryRequester.getCategoryImage(categoryId, customerId);
                if (fileVM) {
                    res.setHeader('Content-Type', fileVM.getContentType());
                    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(fileVM.getFileName())}`);
                    res.end(fileVM.getFile(), 'base64');
                } else {
                    res.status(404).send();
                }
            } catch (error) {
                next(error);
            }
        });

        this.getRouter().get('/product/:productId/productOption/:productOptionId/image/:productOptionPictureId', async (req: any, res: any, next: any) => {
            try {
                const productOptionPictureId = String(req.params.productOptionPictureId);
                const fileVM = await this.productOptionPictureRequester.getProductOptionPicture(productOptionPictureId);
                if (fileVM) {
                    res.setHeader('Content-Type', fileVM.getContentType());
                    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(fileVM.getFileName())}`);
                    res.end(fileVM.getFile(), 'base64');
                } else {
                    res.status(404).send();
                }
            } catch (error) {
                next(error);
            }
        });
    }
}