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
        const customerFacade = new CustomerFacade_1.default(customerDataMapper);
        const userFacade = new UserFacade_1.default(userDataMapper);
        const internalizationFacade = new InternalizationFacade_1.default(internalizationDataMapper);
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
        this.expressApp.use('/api', new PublicFileRouter_1.default().getRouter());
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(new ExtractTokenMiddleware_1.default().getRequestHandler());
        this.expressApp.use(new ExtractCustomerMiddleware_1.default().getRequestHandler());
        this.expressApp.use('/api', new UserRouter_1.default(userFacade).getRouter());
        this.expressApp.use('/api', new CustomerRouter_1.default(customerFacade).getRouter());
        this.expressApp.use('/api', new InternalizationRouter_1.default(internalizationFacade).getRouter());
    }
}
exports.default = AppSingleton;
//# sourceMappingURL=AppSingleton.js.map