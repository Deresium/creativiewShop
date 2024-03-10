import TitleValueVM from "../models/viewmodels/TitleValueVM";

export default interface IGroupRequester {
    getDiscountGroupsForCustomer(customerId: number): Promise<Array<TitleValueVM<string, string>>>;
}