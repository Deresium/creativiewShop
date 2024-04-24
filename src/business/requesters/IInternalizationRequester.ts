import InternalizationVM from "../models/viewmodels/InternalizationVM";

export default interface IInternalizationRequester {
    getInternalizationMessagesForCustomer(customerId: number): Promise<Array<InternalizationVM>>;

    getInternalizationMessagesForCustomerInOneLanguage(customerId: number, language: string): Promise<Map<string, string>>
}