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

    public async addUserToDiscountGroup(userId: string, groupId: string): Promise<void> {
        const userExistsInGroup = await this.userGroupDataGateway.existsUserInDiscountGroup(userId);
        if (userExistsInGroup) {
            throw new Error('error.userExistsInGroup');
        }
        await this.userGroupDataGateway.addUserToGroup(userId, groupId);
    }

    public async deleteUserFromGroup(userId: string, groupId: string): Promise<void> {
        await this.userGroupDataGateway.deleteUserFromGroup(userId, groupId);
    }
}