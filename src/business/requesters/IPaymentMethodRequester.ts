import TitleValueVM from "../models/viewmodels/TitleValueVM";

export default interface IPaymentMethodRequester {
    getPaymentMethodsForCustomer(customerId: number): Promise<Array<TitleValueVM<string, string>>>;
}