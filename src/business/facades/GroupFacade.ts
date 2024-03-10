import IGroupRequester from "../requesters/IGroupRequester";
import IGroupDataGateway from "../../database/gateways/IGroupDataGateway";
import TitleValueVM from "../models/viewmodels/TitleValueVM";

export default class GroupFacade implements IGroupRequester {
    private readonly groupDataGateway: IGroupDataGateway;

    constructor(groupDataGateway: IGroupDataGateway) {
        this.groupDataGateway = groupDataGateway;
    }

    public async getDiscountGroupsForCustomer(customerId: number): Promise<Array<TitleValueVM<string, string>>> {
        const groups = await this.groupDataGateway.getDiscountGroupsForCustomer(customerId);
        return groups.map(group => new TitleValueVM<string, string>(group.getName(), group.getGroupId()));
    }
}