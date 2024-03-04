"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DatabaseConnectionMapper_1 = __importDefault(require("./database/datamappers/DatabaseConnectionMapper"));
const CustomerCacheSingleton_1 = __importDefault(require("./business/cache/CustomerCacheSingleton"));
const CustomerDataMapper_1 = __importDefault(require("./database/datamappers/CustomerDataMapper"));
const RedirectHttpsMiddleware_1 = __importDefault(require("./routers/middlewares/RedirectHttpsMiddleware"));
const AllowLocahostMiddleware_1 = __importDefault(require("./routers/middlewares/AllowLocahostMiddleware"));
const path_1 = __importDefault(require("path"));
const ReturnIndexMiddleware_1 = __importDefault(require("./routers/middlewares/ReturnIndexMiddleware"));
const PublicFileRouter_1 = __importDefault(require("./routers/routes/PublicFileRouter"));
const ExtractTokenMiddleware_1 = __importDefault(require("./routers/middlewares/ExtractTokenMiddleware"));
const UserRouter_1 = __importDefault(require("./routers/routes/UserRouter"));
const CustomerFacade_1 = __importDefault(require("./business/facades/CustomerFacade"));
const UserDataMapper_1 = __importDefault(require("./database/datamappers/UserDataMapper"));
const UserFacade_1 = __importDefault(require("./business/facades/UserFacade"));
const CustomerRouter_1 = __importDefault(require("./routers/routes/CustomerRouter"));
const ExtractCustomerMiddleware_1 = __importDefault(require("./routers/middlewares/ExtractCustomerMiddleware"));
const InternalizationFacade_1 = __importDefault(require("./business/facades/InternalizationFacade"));
const InternalizationDataMapper_1 = __importDefault(require("./database/datamappers/InternalizationDataMapper"));
const InternalizationRouter_1 = __importDefault(require("./routers/routes/InternalizationRouter"));
const ExtractLanguageMiddleware_1 = __importDefault(require("./routers/middlewares/ExtractLanguageMiddleware"));
const UserGroupDataMapper_1 = __importDefault(require("./database/datamappers/UserGroupDataMapper"));
const UserGroupFacade_1 = __importDefault(require("./business/facades/UserGroupFacade"));
const CategoryDataMapper_1 = __importDefault(require("./database/datamappers/CategoryDataMapper"));
const CategoryFacade_1 = __importDefault(require("./business/facades/CategoryFacade"));
const AwsFileDataMapper_1 = __importDefault(require("./external/aws/files/AwsFileDataMapper"));
const AwsOperations_1 = __importDefault(require("./external/aws/files/AwsOperations"));
const CategoryRouter_1 = __importDefault(require("./routers/routes/CategoryRouter"));
const ManufacturerDataMapper_1 = __importDefault(require("./database/datamappers/ManufacturerDataMapper"));
const ManufacturerFacade_1 = __importDefault(require("./business/facades/ManufacturerFacade"));
const ManufacturerRouter_1 = __importDefault(require("./routers/routes/ManufacturerRouter"));
const ProductDataMapper_1 = __importDefault(require("./database/datamappers/ProductDataMapper"));
const ProductFacade_1 = __importDefault(require("./business/facades/ProductFacade"));
const ProductRouter_1 = __importDefault(require("./routers/routes/ProductRouter"));
const ProductOptionDataMapper_1 = __importDefault(require("./database/datamappers/ProductOptionDataMapper"));
const ProductOptionFacade_1 = __importDefault(require("./business/facades/ProductOptionFacade"));
const ProductOptionRouter_1 = __importDefault(require("./routers/routes/ProductOptionRouter"));
const OnlyAdminMiddleware_1 = __importDefault(require("./routers/middlewares/OnlyAdminMiddleware"));
const CheckProductOwnerMiddleware_1 = __importDefault(require("./routers/middlewares/CheckProductOwnerMiddleware"));
const ProductOptionCategoryDataMapper_1 = __importDefault(require("./database/datamappers/ProductOptionCategoryDataMapper"));
const ProductOptionPictureDataMapper_1 = __importDefault(require("./database/datamappers/ProductOptionPictureDataMapper"));
const ProductOptionPriceFacade_1 = __importDefault(require("./business/facades/ProductOptionPriceFacade"));
const ProductOptionPriceDataMapper_1 = __importDefault(require("./database/datamappers/ProductOptionPriceDataMapper"));
const ProductOptionCategoryFacade_1 = __importDefault(require("./business/facades/ProductOptionCategoryFacade"));
const ProductOptionPictureFacade_1 = __importDefault(require("./business/facades/ProductOptionPictureFacade"));
class AppSingleton {
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.initApp();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AppSingleton();
        }
        return this.instance;
    }
    getExpressApp() {
        return this.expressApp;
    }
    initApp() {
        const databaseConnectionGateway = new DatabaseConnectionMapper_1.default();
        databaseConnectionGateway.testConnect().then(() => console.log('test connexion ended'));
        const customerDataMapper = new CustomerDataMapper_1.default();
        const userDataMapper = new UserDataMapper_1.default();
        const internalizationDataMapper = new InternalizationDataMapper_1.default();
        const userGroupDataMapper = new UserGroupDataMapper_1.default();
        const categoryDataMapper = new CategoryDataMapper_1.default();
        const fileDataMapper = new AwsFileDataMapper_1.default(new AwsOperations_1.default());
        const manufacturerDataMapper = new ManufacturerDataMapper_1.default();
        const productDataMapper = new ProductDataMapper_1.default();
        const productOptionDataMapper = new ProductOptionDataMapper_1.default();
        const productOptionPriceDataMapper = new ProductOptionPriceDataMapper_1.default();
        const productOptionCategoryDataMapper = new ProductOptionCategoryDataMapper_1.default();
        const productOptionPictureDataMapper = new ProductOptionPictureDataMapper_1.default();
        const customerFacade = new CustomerFacade_1.default(customerDataMapper);
        const userGroupFacade = new UserGroupFacade_1.default(userGroupDataMapper);
        const userFacade = new UserFacade_1.default(userDataMapper, userGroupFacade);
        const internalizationFacade = new InternalizationFacade_1.default(internalizationDataMapper);
        const categoryFacade = new CategoryFacade_1.default(categoryDataMapper, fileDataMapper);
        const manufacturerFacade = new ManufacturerFacade_1.default(manufacturerDataMapper);
        const productFacade = new ProductFacade_1.default(productDataMapper);
        const productOptionFacade = new ProductOptionFacade_1.default(productOptionDataMapper);
        const productOptionPriceFacade = new ProductOptionPriceFacade_1.default(productOptionPriceDataMapper);
        const productOptionCategoryFacade = new ProductOptionCategoryFacade_1.default(productOptionCategoryDataMapper);
        const productOptionPictureFacade = new ProductOptionPictureFacade_1.default(productOptionPictureDataMapper, fileDataMapper);
        CustomerCacheSingleton_1.default.getInstance(customerFacade).initCache().then(() => {
            console.log('customers cache done');
        });
        if (process.env.NODE_ENV === 'production') {
            this.expressApp.use(new RedirectHttpsMiddleware_1.default().getRequestHandler());
        }
        else {
            this.expressApp.use(new AllowLocahostMiddleware_1.default().getRequestHandler());
        }
        const publicDirectoryPath = path_1.default.join(__dirname, '../public');
        this.expressApp.use(express_1.default.static(publicDirectoryPath));
        this.expressApp.use(new ReturnIndexMiddleware_1.default().getRequestHandler());
        this.expressApp.use(new ExtractCustomerMiddleware_1.default().getRequestHandler());
        this.expressApp.use('/api', new PublicFileRouter_1.default(categoryFacade, productOptionPictureFacade).getRouter());
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(new ExtractTokenMiddleware_1.default().getRequestHandler());
        this.expressApp.use(new ExtractLanguageMiddleware_1.default().getRequestHandler());
        const onlyAdminMiddleware = new OnlyAdminMiddleware_1.default().getRequestHandler();
        const checkProductOwnerMiddleware = new CheckProductOwnerMiddleware_1.default(productFacade).getRequestHandler();
        this.expressApp.use('/api', new UserRouter_1.default(userFacade).getRouter());
        this.expressApp.use('/api', new CustomerRouter_1.default().getRouter());
        this.expressApp.use('/api', new InternalizationRouter_1.default(internalizationFacade).getRouter());
        this.expressApp.use('/api', new CategoryRouter_1.default(categoryFacade, onlyAdminMiddleware).getRouter());
        this.expressApp.use('/api', new ManufacturerRouter_1.default(manufacturerFacade, onlyAdminMiddleware).getRouter());
        this.expressApp.use('/api', new ProductRouter_1.default(productFacade, onlyAdminMiddleware).getRouter());
        this.expressApp.use('/api', new ProductOptionRouter_1.default(productOptionFacade, productOptionPriceFacade, productOptionCategoryFacade, productOptionPictureFacade, onlyAdminMiddleware, checkProductOwnerMiddleware).getRouter());
    }
}
exports.default = AppSingleton;
//# sourceMappingURL=AppSingleton.js.map