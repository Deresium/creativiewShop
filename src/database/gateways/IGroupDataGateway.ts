import GroupEntity from "../entities/GroupEntity";

export default interface IGroupDataGateway {
    getDiscountGroupsForCustomer(customerId: number): Promise<Array<GroupEntity>>;
}