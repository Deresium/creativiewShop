import ApplicationRouter from "./ApplicationRouter";
import ICategoryRequester from "../../business/requesters/ICategoryRequester";

export default class PublicFileRouter extends ApplicationRouter {
    private readonly categoryRequester: ICategoryRequester;

    constructor(categoryRequester: ICategoryRequester) {
        super();
        this.categoryRequester = categoryRequester;
    }

    public initRoutes() {
        this.getRouter().get('/category/:categoryId', async (req: any, res: any) => {
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
        });
    }
}