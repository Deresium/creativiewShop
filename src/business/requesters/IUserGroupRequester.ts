export default interface IUserGroupRequester {
    getAllGroupsForUser(userId: string): Promise<Array<string>>;
}