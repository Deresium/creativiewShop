import ApplicationRouter from "./ApplicationRouter";
import IUserRequester from "../../business/requesters/IUserRequester";
import {RequestHandler, Request, Response} from "express";
import UserCreationDS from "../../business/models/datastores/UserCreationDS";

export default class UserRouter extends ApplicationRouter {

    private readonly userRequester: IUserRequester;

    constructor(userRequester: IUserRequester) {
        super();
        this.userRequester = userRequester;
    }

    public initRoutes(): void {
        this.getRouter().post('/user', async (req: Request, res: Response) => {
            await this.userRequester.createUser(new UserCreationDS('', '', '', '', '', 1));
        });
    }
}