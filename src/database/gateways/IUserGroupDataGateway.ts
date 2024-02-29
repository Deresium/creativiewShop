import UserGroupEntity from "../entities/UserGroupEntity";

export default interface IUserGroupDataGateway {
    getAllGroupsForUser(userId: string, customerId: number): Promise<Array<UserGroupEntity>>;
}