import ApplicationRouter from "./ApplicationRouter";
import IUserRequester from "../../business/requesters/IUserRequester";
import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import LoginInfoDS from "../../business/models/datastores/LoginInfoDS";
import CookiesGenerator from "../../business/utils/CookiesGenerator";
import UserLoginVM from "../../business/models/viewmodels/UserLoginVM";

export default class UserRouter extends ApplicationRouter {

    private readonly userRequester: IUserRequester;

    constructor(userRequester: IUserRequester) {
        super();
        this.userRequester = userRequester;
    }

    public initRoutes(): void {
        this.getRouter().post('/user', async (req: any, res: any) => {
            const email = req.body.email;
            const name = req.body.name;
            const firstName = req.body.firstName;
            const password = req.body.password;
            const repeatPassword = req.body.repeatPassword;
            const customerId = req.customer.getCustomerId();
            try {
                await this.userRequester.createUser(new UserCreationDS(email, password, repeatPassword, name, firstName, customerId));
                res.send();
            } catch (error: any) {
                console.error(error);
                res.status(400).send(error.message);
            }
        });

        this.getRouter().post('/login', async (req: any, res: any) => {
            const email = req.body.email;
            const password = req.body.password;
            const customerId = req.customer.getCustomerId();

            try {
                const user: UserLoginVM = await this.userRequester.loginUser(new LoginInfoDS(email, customerId, password));
                if (user) {
                    const cookieGenerator = new CookiesGenerator(user.getUserId(), user.getRole());
                    res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
                    res.send();
                } else {
                    res.status(400).send('login.fail');
                }
            } catch (error: any) {
                console.error(error);
                res.status(400).send();
            }
        });

        this.getRouter().post('/logout', async(req: any, res: any) => {
            const cookieGenerator = new CookiesGenerator(null);
            res.setHeader('Set-Cookie', [cookieGenerator.getSignatureCookie(), cookieGenerator.getPayloadCookie()]);
            res.send();
        });

        this.getRouter().get('/user', async (req, res) => {
            const userId = req.userId;
            if (!userId) {
                res.status(400).send();
                return;
            }
            const user = await this.userRequester.getUser(userId);
            res.status(200).send(user);
        });
    }
}