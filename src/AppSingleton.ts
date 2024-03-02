import express from "express";
import DatabaseConnectionMapper from "./database/datamappers/DatabaseConnectionMapper";
import CustomerCacheSingleton from "./business/cache/CustomerCacheSingleton";
import CustomerDataMapper from "./database/datamappers/CustomerDataMapper";
import RedirectHttpsMiddleware from "./routers/middlewares/RedirectHttpsMiddleware";
import AllowLocalhostMiddleware from "./routers/middlewares/AllowLocahostMiddleware";
import path from "path";
import ReturnIndexMiddleware from "./routers/middlewares/ReturnIndexMiddleware";
import PublicFileRouter from "./routers/routes/PublicFileRouter";
import ExtractTokenMiddleware from "./routers/middlewares/ExtractTokenMiddleware";
import UserRouter from "./routers/routes/UserRouter";
import CustomerFacade from "./business/facades/CustomerFacade";
import UserDataMapper from "./database/datamappers/UserDataMapper";
import UserFacade from "./business/facades/UserFacade";
import CustomerRouter from "./routers/routes/CustomerRouter";
import ExtractCustomerMiddleware from "./routers/middlewares/ExtractCustomerMiddleware";
import InternalizationFacade from "./business/facades/InternalizationFacade";
import InternalizationDataMapper from "./database/datamappers/InternalizationDataMapper";
import InternalizationRouter from "./routers/routes/InternalizationRouter";
import ExtractLanguageMiddleware from "./routers/middlewares/ExtractLanguageMiddleware";
import UserGroupDataMapper from "./database/datamappers/UserGroupDataMapper";
import UserGroupFacade from "./business/facades/UserGroupFacade";
import CategoryDataMapper from "./database/datamappers/CategoryDataMapper";
import CategoryFacade from "./business/facades/CategoryFacade";
import AwsFileDataMapper from "./external/aws/files/AwsFileDataMapper";
import AwsOperations from "./external/aws/files/AwsOperations";
import CategoryRouter from "./routers/routes/CategoryRouter";
import ManufacturerDataMapper from "./database/datamappers/ManufacturerDataMapper";
import ManufacturerFacade from "./business/facades/ManufacturerFacade";
import ManufacturerRouter from "./routers/routes/ManufacturerRouter";
import ProductDataMapper from "./database/datamappers/ProductDataMapper";
import ProductFacade from "./business/facades/ProductFacade";
import ProductRouter from "./routers/routes/ProductRouter";
import ProductOptionDataMapper from "./database/datamappers/ProductOptionDataMapper";
import ProductOptionFacade from "./business/facades/ProductOptionFacade";
import ProductOptionRouter from "./routers/routes/ProductOptionRouter";
import OnlyAdminStoreMiddleware from "./routers/middlewares/OnlyAdminMiddleware";
import CheckProductOwnerMiddleware from "./routers/middlewares/CheckProductOwnerMiddleware";

export default class AppSingleton {
    private static instance: AppSingleton;
    private readonly expressApp = express();

    private constructor() {
        this.initApp();
    }

    public static getInstance(): AppSingleton {
        if (!this.instance) {
            this.instance = new AppSingleton();
        }
        return this.instance;
    }

    public getExpressApp() {
        return this.expressApp;
    }

    private initApp() {
        const databaseConnectionGateway = new DatabaseConnectionMapper();
        databaseConnectionGateway.testConnect().then(() => console.log('test connexion ended'));

        const customerDataMapper = new CustomerDataMapper();
        const userDataMapper = new UserDataMapper();
        const internalizationDataMapper = new InternalizationDataMapper();
        const userGroupDataMapper = new UserGroupDataMapper();
        const categoryDataMapper = new CategoryDataMapper();
        const fileDataMapper = new AwsFileDataMapper(new AwsOperations());
        const manufacturerDataMapper = new ManufacturerDataMapper();
        const productDataMapper = new ProductDataMapper();
        const productOptionDataMapper = new ProductOptionDataMapper();

        const customerFacade = new CustomerFacade(customerDataMapper);
        const userGroupFacade = new UserGroupFacade(userGroupDataMapper);
        const userFacade = new UserFacade(userDataMapper, userGroupFacade);
        const internalizationFacade = new InternalizationFacade(internalizationDataMapper);
        const categoryFacade = new CategoryFacade(categoryDataMapper, fileDataMapper);
        const manufacturerFacade = new ManufacturerFacade(manufacturerDataMapper);
        const productFacade = new ProductFacade(productDataMapper);
        const productOptionFacade = new ProductOptionFacade(productOptionDataMapper);

        CustomerCacheSingleton.getInstance(customerFacade).initCache().then(() => {
            console.log('customers cache done');
        });


        if (process.env.NODE_ENV === 'production') {
            this.expressApp.use(new RedirectHttpsMiddleware().getRequestHandler());
        } else {
            this.expressApp.use(new AllowLocalhostMiddleware().getRequestHandler());
        }

        const publicDirectoryPath = path.join(__dirname, '../public');
        this.expressApp.use(express.static(publicDirectoryPath));

        this.expressApp.use(new ReturnIndexMiddleware().getRequestHandler());
        this.expressApp.use(new ExtractCustomerMiddleware().getRequestHandler());

        this.expressApp.use('/api', new PublicFileRouter(categoryFacade).getRouter());


        this.expressApp.use(express.json());

        this.expressApp.use(new ExtractTokenMiddleware().getRequestHandler());
        this.expressApp.use(new ExtractLanguageMiddleware().getRequestHandler());

        const onlyAdminMiddleware = new OnlyAdminStoreMiddleware().getRequestHandler();
        const checkProductOwnerMiddleware = new CheckProductOwnerMiddleware(productFacade).getRequestHandler();
        console.log('app', checkProductOwnerMiddleware);

        this.expressApp.use('/api', new UserRouter(userFacade).getRouter());
        this.expressApp.use('/api', new CustomerRouter().getRouter());
        this.expressApp.use('/api', new InternalizationRouter(internalizationFacade).getRouter());
        this.expressApp.use('/api', new CategoryRouter(categoryFacade, onlyAdminMiddleware).getRouter());
        this.expressApp.use('/api', new ManufacturerRouter(manufacturerFacade, onlyAdminMiddleware).getRouter());
        this.expressApp.use('/api', new ProductRouter(productFacade, onlyAdminMiddleware).getRouter());
        this.expressApp.use('/api', new ProductOptionRouter(productOptionFacade, onlyAdminMiddleware, checkProductOwnerMiddleware).getRouter());
    }
}