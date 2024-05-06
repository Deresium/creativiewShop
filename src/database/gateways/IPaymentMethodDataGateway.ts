import PaymentMethodCustomerEntity from "../entities/PaymentMethodCustomerEntity";

export default interface IPaymentMethodDataGateway {
    getPaymentMethodForCustomer(customerId: number): Promise<Array<PaymentMethodCustomerEntity>>;

    getPaymentMethodCustomerByPaymentMethod(paymentMethod: string): Promise<Array<PaymentMethodCustomerEntity>>;

    getPaymentMethodCustomerById(customerId: number, paymentMethod: string): Promise<PaymentMethodCustomerEntity>;

    updateKeySecretForCustomerOnlinePayment(encryptedKey: string, encryptedSecret: string, customerId: number): Promise<void>;
}