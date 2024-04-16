import PaymentMethodCustomerEntity from "../entities/PaymentMethodCustomerEntity";

export default interface IPaymentMethodDataGateway {
    getPaymentMethodForCustomer(customerId: number): Promise<Array<PaymentMethodCustomerEntity>>;
}