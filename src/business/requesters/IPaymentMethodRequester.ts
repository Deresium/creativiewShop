import TitleValueVM from "../models/viewmodels/TitleValueVM";
import PaymentMethodCustomerVM from "../models/viewmodels/PaymentMethodCustomerVM";

export default interface IPaymentMethodRequester {
    getPaymentMethodsForCustomer(customerId: number): Promise<Array<TitleValueVM<string, string>>>;

    updateKeySecretForCustomerOnlinePayment(key: string, secret: string, customerId: number): Promise<void>;

    getPaymentMethodInfoOnlineCustomer(): Promise<Array<PaymentMethodCustomerVM>>;

    getPaypalMeURL(customerId: number, total: string, currency: string): Promise<string>;

    getPaypalQrCode(customerId: number, total: string, currency: string): Promise<string>;
}