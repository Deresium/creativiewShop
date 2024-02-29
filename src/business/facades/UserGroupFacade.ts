import IUserGroupRequester from "../requesters/IUserGroupRequester";
import IUserGroupDataGateway from "../../database/gateways/IUserGroupDataGateway";

export default class UserGroupFacade implements IUserGroupRequester {
    private readonly userGroupDataGateway: IUserGroupDataGateway;

    constructor(userGroupDataGateway: IUserGroupDataGateway) {
        this.userGroupDataGateway = userGroupDataGateway;
    }

    public async getAllGroupsForUser(userId: string, customerId: number): Promise<Array<string>> {
        const userGroups = await this.userGroupDataGateway.getAllGroupsForUser(userId, customerId);
        return userGroups.map(userGroup => userGroup.getGroupId());
    }
}