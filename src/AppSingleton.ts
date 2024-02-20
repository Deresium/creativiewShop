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

        const customerFacade = new CustomerFacade(customerDataMapper);
        const userFacade = new UserFacade(userDataMapper);
        const internalizationFacade = new InternalizationFacade(internalizationDataMapper);

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

        this.expressApp.use('/api', new PublicFileRouter().getRouter());


        this.expressApp.use(express.json());

        this.expressApp.use(new ExtractTokenMiddleware().getRequestHandler());
        this.expressApp.use(new ExtractCustomerMiddleware().getRequestHandler());

        this.expressApp.use('/api', new UserRouter(userFacade).getRouter());
        this.expressApp.use('/api', new CustomerRouter(customerFacade).getRouter());
        this.expressApp.use('/api', new InternalizationRouter(internalizationFacade).getRouter());

    }
}