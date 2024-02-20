import IUserRequester from "../requesters/IUserRequester";
import IUserDataGateway from "../../database/gateways/IUserDataGateway";
import UserCreationDS from "../models/datastores/UserCreationDS";

export default class UserFacade implements IUserRequester {
    private readonly userDataGateway: IUserDataGateway;

    constructor(userDataGateway: IUserDataGateway) {
        this.userDataGateway = userDataGateway;
    }

    public async createUser(userCreationDS: UserCreationDS): Promise<void> {

    }
}