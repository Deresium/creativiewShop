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
import OnlyAdminStoreMiddleware from "./routers/middlewares/OnlyAdminStoreMiddleware";
import CheckProductOwnerMiddleware from "./routers/middlewares/CheckProductOwnerMiddleware";
import ProductOptionCategoryDataMapper from "./database/datamappers/ProductOptionCategoryDataMapper";
import ProductOptionPictureDataMapper from "./database/datamappers/ProductOptionPictureDataMapper";
import ProductOptionPriceFacade from "./business/facades/ProductOptionPriceFacade";
import ProductOptionPriceDataMapper from "./database/datamappers/ProductOptionPriceDataMapper";
import ProductOptionCategoryFacade from "./business/facades/ProductOptionCategoryFacade";
import ProductOptionPictureFacade from "./business/facades/ProductOptionPictureFacade";
import ProductOptionDiscountDataMapper from "./database/datamappers/ProductOptionDiscountDataMapper";
import CurrencyRateDataMapper from "./database/datamappers/CurrencyRateDataMapper";
import ProductOptionDiscountFacade from "./business/facades/ProductOptionDiscountFacade";
import CurrencyRateFacade from "./business/facades/CurrencyRateFacade";
import CurrencyRateRouter from "./routers/routes/CurrencyRateRouter";
import rateLimit from "express-rate-limit";
import GroupDataMapper from "./database/datamappers/GroupDataMapper";
import GroupFacade from "./business/facades/GroupFacade";
import GroupRouter from "./routers/routes/GroupRouter";
import DeliveryOptionDataMapper from "./database/datamappers/DeliveryOptionDataMapper";
import DeliveryOptionFacade from "./business/facades/DeliveryOptionFacade";
import DeliveryOptionRouter from "./routers/routes/DeliveryOptionRouter";
import CheckDeliveryOptionOwnerMiddleware from "./routers/middlewares/CheckDeliveryOptionOwnerMiddleware";
import DeliveryOptionCountryFacade from "./business/facades/DeliveryOptionCountryFacade";
import DeliveryOptionCountryDataMapper from "./database/datamappers/DeliveryOptionCountryDataMapper";
import WeightPriceDataMapper from "./database/datamappers/WeightPriceDataMapper";
import WeightPriceFacade from "./business/facades/WeightPriceFacade";
import CountryDataMapper from "./database/datamappers/CountryDataMapper";
import CountryFacade from "./business/facades/CountryFacade";
import CheckUserOwnerMiddleware from "./routers/middlewares/checkUserOwnerMiddleware";
import SendMailDataMapper from "./external/aws/mail/SendMailDataMapper";
import CheckTokenRecaptchaMiddleware from "./routers/middlewares/CheckTokenRecaptchaMiddleware";
import StoreRouter from "./routers/routes/StoreRouter";
import CheckStoreAccessMiddleware from "./routers/middlewares/CheckStoreAccessMiddleware";
import BasketDataMapper from "./database/datamappers/BasketDataMapper";
import BasketFacade from "./business/facades/BasketFacade";
import ExtractOrCreateUserTempMiddleware from "./routers/middlewares/ExtractOrCreateUserTempMiddleware";
import ExtractOpenBasketIdMiddleware from "./routers/middlewares/ExtractOpenBasketIdMiddleware";
import BasketRouter from "./routers/routes/BasketRouter";
import AddressDataMapper from "./database/datamappers/AddressDataMapper";
import AddressFacade from "./business/facades/AddressFacade";
import AddressRouter from "./routers/routes/AddressRouter";
import PaymentMethodDataMapper from "./database/datamappers/PaymentMethodDataMapper";
import PaymentMethodFacade from "./business/facades/PaymentMethodFacade";
import PaymentMethodRouter from "./routers/routes/PaymentMethodRouter";
import CheckBasketAccessMiddleware from "./routers/middlewares/CheckBasketAccessMiddleware";
import OrderRouter from "./routers/routes/OrderRouter";
import OrderPdfRouter from "./routers/routes/OrderPdfRouter";
import OnlyAdminGlobalMiddleware from "./routers/middlewares/OnlyAdminGlobalMiddleware";
import AdminGlobalRouter from "./routers/routes/AdminGlobalRouter";
import NewsletterDataMapper from "./database/datamappers/NewsletterDataMapper";
import NewsletterFacade from "./business/facades/NewsletterFacade";
import NewsletterRouter from "./routers/routes/NewsletterRouter";
import ErrorHandlerMiddleware from "./routers/middlewares/ErrorHandlerMiddleware";

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
        const productOptionPriceDataMapper = new ProductOptionPriceDataMapper();
        const productOptionCategoryDataMapper = new ProductOptionCategoryDataMapper();
        const productOptionPictureDataMapper = new ProductOptionPictureDataMapper();
        const productOptionDiscountDataMapper = new ProductOptionDiscountDataMapper();
        const currencyRateDataMapper = new CurrencyRateDataMapper();
        const groupDataMapper = new GroupDataMapper();
        const deliveryOptionDataMapper = new DeliveryOptionDataMapper();
        const deliveryOptionCountryDataMapper = new DeliveryOptionCountryDataMapper();
        const countryDataMapper = new CountryDataMapper();
        const weightPriceDataMapper = new WeightPriceDataMapper();
        const sendMailDataMapper = new SendMailDataMapper();
        const basketDataMapper = new BasketDataMapper();
        const addressDataMapper = new AddressDataMapper();
        const paymentMethodDataMapper = new PaymentMethodDataMapper();
        const newsletterDataMapper = new NewsletterDataMapper();

        const customerFacade = new CustomerFacade(customerDataMapper);
        const userGroupFacade = new UserGroupFacade(userGroupDataMapper);
        const userFacade = new UserFacade(userDataMapper, userGroupDataMapper, userGroupFacade, sendMailDataMapper);
        const internalizationFacade = new InternalizationFacade(internalizationDataMapper);
        const categoryFacade = new CategoryFacade(categoryDataMapper, fileDataMapper);
        const manufacturerFacade = new ManufacturerFacade(manufacturerDataMapper);
        const productFacade = new ProductFacade(productDataMapper);
        const productOptionPriceFacade = new ProductOptionPriceFacade(productOptionPriceDataMapper);
        const productOptionCategoryFacade = new ProductOptionCategoryFacade(productOptionCategoryDataMapper);
        const productOptionPictureFacade = new ProductOptionPictureFacade(productOptionPictureDataMapper, fileDataMapper);
        const productOptionDiscountFacade = new ProductOptionDiscountFacade(productOptionDiscountDataMapper);
        const currencyRateFacade = new CurrencyRateFacade(currencyRateDataMapper);
        const productOptionFacade = new ProductOptionFacade(productOptionDataMapper, currencyRateFacade);
        const groupFacade = new GroupFacade(groupDataMapper);
        const deliveryOptionFacade = new DeliveryOptionFacade(deliveryOptionDataMapper, currencyRateFacade);
        const deliveryOptionCountryFacade = new DeliveryOptionCountryFacade(deliveryOptionCountryDataMapper);
        const countryFacade = new CountryFacade(countryDataMapper);
        const weightPriceFacade = new WeightPriceFacade(weightPriceDataMapper);
        const paymentMethodFacade = new PaymentMethodFacade(paymentMethodDataMapper);
        const basketFacade = new BasketFacade(basketDataMapper, productOptionFacade, productOptionDataMapper, deliveryOptionFacade, currencyRateFacade, sendMailDataMapper, userGroupDataMapper, customerFacade, paymentMethodFacade, internalizationFacade);
        const addressFacade = new AddressFacade(addressDataMapper);
        const newsletterFacade = new NewsletterFacade(newsletterDataMapper, userDataMapper, userGroupDataMapper, sendMailDataMapper);

        CustomerCacheSingleton.getInstance(customerFacade).initCache().then(() => {
            console.log('customers cache done');
        });

        // rate-limiting
        const limiter = rateLimit({
            windowMs: 60 * 1000, // 1 minutes
            limit: 500,
            standardHeaders: 'draft-7',
            legacyHeaders: false,
            message: ('rateLimitReached')
        });

        this.expressApp.use(limiter);


        if (process.env.NODE_ENV === 'production') {
            this.expressApp.use(new RedirectHttpsMiddleware().getRequestHandler());
        } else {
            this.expressApp.use(new AllowLocalhostMiddleware().getRequestHandler());
        }

        const publicDirectoryPath = path.join(__dirname, '../public');
        this.expressApp.use(express.static(publicDirectoryPath));

        this.expressApp.use(new ExtractCustomerMiddleware().getRequestHandler());
        this.expressApp.use(new ReturnIndexMiddleware().getRequestHandler());

        this.expressApp.use('/api', new PublicFileRouter(categoryFacade, productOptionPictureFacade).getRouter());


        this.expressApp.use(express.json());

        this.expressApp.use(new ExtractTokenMiddleware().getRequestHandler());
        this.expressApp.use(new ExtractLanguageMiddleware().getRequestHandler());

        const onlyAdminStoreMiddleware = new OnlyAdminStoreMiddleware().getRequestHandler();
        const onlyAdminGlobalMiddleware = new OnlyAdminGlobalMiddleware().getRequestHandler();
        const checkProductOwnerMiddleware = new CheckProductOwnerMiddleware(productFacade).getRequestHandler();
        const checkDeliveryOptionOwnerMiddleware = new CheckDeliveryOptionOwnerMiddleware(deliveryOptionFacade).getRequestHandler();
        const checkUserOwnerMiddleware = new CheckUserOwnerMiddleware(userFacade).getRequestHandler();
        const checkTokenRecaptchaMiddleware = new CheckTokenRecaptchaMiddleware().getRequestHandler();
        const checkStoreAccessMiddleware = new CheckStoreAccessMiddleware().getRequestHandler();
        const extractOrCreateUserTempMiddleware = new ExtractOrCreateUserTempMiddleware(userFacade).getRequestHandler();
        const extractOpenBasketIdMiddleware = new ExtractOpenBasketIdMiddleware(basketFacade).getRequestHandler();
        const checkBasketAccessMiddleware = new CheckBasketAccessMiddleware(basketFacade).getRequestHandler();

        this.expressApp.use('/api', new UserRouter(userFacade, userGroupFacade, onlyAdminStoreMiddleware, checkUserOwnerMiddleware, checkTokenRecaptchaMiddleware).getRouter());
        this.expressApp.use('/api', new CustomerRouter(customerFacade).getRouter());
        this.expressApp.use('/api', new InternalizationRouter(internalizationFacade).getRouter());
        this.expressApp.use('/api', new CategoryRouter(categoryFacade, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use('/api', new ManufacturerRouter(manufacturerFacade, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use('/api', new ProductRouter(productFacade, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use('/api', new ProductOptionRouter(productOptionFacade, productOptionPriceFacade, productOptionCategoryFacade, productOptionPictureFacade, productOptionDiscountFacade, onlyAdminStoreMiddleware, checkProductOwnerMiddleware).getRouter());
        this.expressApp.use('/api', new CurrencyRateRouter(currencyRateFacade, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use('/api', new GroupRouter(groupFacade, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use('/api', new DeliveryOptionRouter(deliveryOptionFacade, deliveryOptionCountryFacade, countryFacade, weightPriceFacade, onlyAdminStoreMiddleware, checkDeliveryOptionOwnerMiddleware).getRouter());
        this.expressApp.use('/api', new StoreRouter(productOptionFacade, checkStoreAccessMiddleware).getRouter());
        this.expressApp.use('/api', new BasketRouter(basketFacade, checkStoreAccessMiddleware, extractOrCreateUserTempMiddleware, extractOpenBasketIdMiddleware).getRouter());
        this.expressApp.use('/api', new AddressRouter(addressFacade, checkStoreAccessMiddleware, extractOrCreateUserTempMiddleware).getRouter());
        this.expressApp.use('/api', new PaymentMethodRouter(paymentMethodFacade).getRouter());
        this.expressApp.use('/api', new OrderRouter(basketFacade, addressFacade, checkBasketAccessMiddleware, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use('/api', new OrderPdfRouter(basketFacade, internalizationFacade, checkBasketAccessMiddleware).getRouter());
        this.expressApp.use('/api', new AdminGlobalRouter(paymentMethodFacade, onlyAdminGlobalMiddleware).getRouter());
        this.expressApp.use('/api', new NewsletterRouter(newsletterFacade, onlyAdminStoreMiddleware).getRouter());
        this.expressApp.use(new ErrorHandlerMiddleware().getRequestHandler());
    }
}