export default interface IUserGroupRequester {
    getAllGroupsForUser(userId: string, customerId: number): Promise<Array<string>>;

    addUserToGroup(userId: string, groupId: string): Promise<void>;

    deleteUserFromGroup(userId: string, groupId: string): Promise<void>;
}