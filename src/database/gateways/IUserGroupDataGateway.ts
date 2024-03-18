import UserGroupEntity from "../entities/UserGroupEntity";

export default interface IUserGroupDataGateway {
    getAllGroupsForUser(userId: string, customerId: number): Promise<Array<UserGroupEntity>>;

    addUserToGroup(userId: string, groupId: string): Promise<void>;

    existsUserInGroup(userId: string, groupId: string): Promise<boolean>;

    deleteUserFromGroup(userId: string, groupId: string): Promise<void>;

    existsUserInDiscountGroup(userId: string): Promise<boolean>;

    findUsersInGroup(customerId: number, groupId: string): Promise<Array<UserGroupEntity>>
}