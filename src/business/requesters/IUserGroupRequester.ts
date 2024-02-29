export default interface IUserGroupRequester {
    getAllGroupsForUser(userId: string, customerId: number): Promise<Array<string>>;
}