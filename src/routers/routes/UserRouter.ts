import ApplicationRouter from "./ApplicationRouter";
import IUserRequester from "../../business/requesters/IUserRequester";
import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import LoginInfoDS from "../../business/models/datastores/LoginInfoDS";
import CookiesGenerator from "../../business/utils/CookiesGenerator";
import UserLoginVM from "../../business/models/viewmodels/UserLoginVM";
import {RequestHandler} from "express";
import IUserGroupRequester from "../../business/requesters/IUserGroupRequester";

export default class UserRouter extends ApplicationRouter {

    private readonly userRequester: IUserRequester;
    private readonly userGroupRequester: IUserGroupRequester;
    private readonly onlyAdminMiddleware: RequestHandler;
    private readonly checkUserOwnerMiddleware: RequestHandler;
    private readonly checkTokenRecaptchaMiddleware: RequestHandler;


    constructor(userRequester: IUserRequester, userGroupRequester: IUserGroupRequester, onlyAdminMiddleware: RequestHandler, checkUserOwnerMiddleware: RequestHandler, checkTokenRecaptchaMiddleware: RequestHandler) {
        super();
        this.userRequester = userRequester;
        this.userGroupRequester = userGroupRequester;
        this.onlyAdminMiddleware = onlyAdminMiddleware;
        this.checkUserOwnerMiddleware = checkUserOwnerMiddleware;
        this.checkTokenRecaptchaMiddleware = checkTokenRecaptchaMiddleware;
        this.initRoutes();
    }

    public initRoutes(): void {
        this.getRouter().post('/user', this.checkTokenRecaptchaMiddleware, async (req: any, res: any) => {
            const email = req.body.email;
            const name = req.body.name;
            const firstName = req.body.firstName;
            const password = req.body.password;
            const repeatPassword = req.body.repeatPassword;
            const language = req.body.language;
            const customer = req.customer;
            try {
                await this.userRequester.createUser(new UserCreationDS(email, password, repeatPassword, name, firstName, customer, language));
                res.send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });

        this.getRouter().post('/login', this.checkTokenRecaptchaMiddleware, async (req: any, res: any) => {
            const email = req.body.email;
            const password = req.body.password;
            const customerId = req.customer.getCustomerId();

            try {
                const user: UserLoginVM = await this.userRequester.loginUser(new LoginInfoDS(email, customerId, password));
                if (user) {
                    const cookieGenerator = new CookiesGenerator(user.getUserId(), user.getUserGroups());
                    res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
                    res.send();
                } else {
                    res.status(400).send('login.fail');
                }
            } catch (error: any) {
                res.status(400).send();
            }
        });

        this.getRouter().post('/logout', async (req: any, res: any) => {
            const cookieGenerator = new CookiesGenerator(null);
            res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
            res.send();
        });

        this.getRouter().post('/forgotPassword', this.checkTokenRecaptchaMiddleware, async (req: any, res: any) => {
            const email = req.body.email;
            const customer = req.customer;
            await this.userRequester.addPasswordChangeRequest(email, customer);
            res.send();
        });

        this.getRouter().post('/changePasswordRequest', this.checkTokenRecaptchaMiddleware, async (req: any, res: any) => {
            const uuid = req.body.uuid;
            const password = req.body.password;
            const repeatPassword = req.body.repeatPassword;

            try {
                await this.userRequester.updatePasswordBasedOnChangeRequest(uuid, password, repeatPassword);
                res.send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });

        this.getRouter().get('/user', async (req: any, res: any) => {
            const userId = req.userId;
            const customerId = req.customer.getCustomerId();
            if (!userId) {
                res.status(200).send();
                return;
            }
            const user = await this.userRequester.getUser(userId, customerId, req.userGroups);
            res.status(200).send(user);
        });

        this.getRouter().get('/user/purchaser', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const onlyWithAccess = req.query.onlyWithAccess === 'true';
            const users = await this.userRequester.findUserPurchasers(customerId, onlyWithAccess);
            res.send(users);
        });

        this.getRouter().put('/user/:userId/access', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const customer = req.customer;
            const userId = String(req.params.userId);
            const access = req.body.access;
            await this.userRequester.updateUserActive(userId, customer, access);
            res.send();
        });

        this.getRouter().post('/user/:userId/group/discount/:groupId', this.onlyAdminMiddleware, this.checkUserOwnerMiddleware, async (req: any, res: any) => {
            const userId = String(req.params.userId);
            const groupId = String(req.params.groupId);
            try {
                await this.userGroupRequester.addUserToDiscountGroup(userId, groupId);
            } catch (error: any) {
                res.status(400).send(error.message);
            }
            res.send();
        });

        this.getRouter().delete('/user/:userId/group/:groupId', this.onlyAdminMiddleware, this.checkUserOwnerMiddleware, async (req: any, res: any) => {
            const userId = String(req.params.userId);
            const groupId = String(req.params.groupId);
            await this.userGroupRequester.deleteUserFromGroup(userId, groupId);
            res.send();
        });

        this.getRouter().get('/group/:groupId/users', this.onlyAdminMiddleware, async (req: any, res: any) => {
            const customerId = req.customer.getCustomerId();
            const groupId = String(req.params.groupId);
            const users = await this.userRequester.getUsersFromGroupForCustomer(customerId, groupId);
            res.send(users);
        });
    }
}