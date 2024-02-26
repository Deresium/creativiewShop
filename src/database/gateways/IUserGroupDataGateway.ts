import UserGroupEntity from "../entities/UserGroupEntity";

export default interface IUserGroupDataGateway {
    getAllGroupsForUser(userId: string): Promise<Array<UserGroupEntity>>;
}