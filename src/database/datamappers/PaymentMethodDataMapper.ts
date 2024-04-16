import IPaymentMethodDataGateway from "../gateways/IPaymentMethodDataGateway";
import PaymentMethodCustomerEntity from "../entities/PaymentMethodCustomerEntity";

export default class PaymentMethodDataMapper implements IPaymentMethodDataGateway {
    public async getPaymentMethodForCustomer(customerId: number): Promise<Array<PaymentMethodCustomerEntity>> {
        return await PaymentMethodCustomerEntity.findAll({
            where: {
                customerId: customerId,
            }
        });
    }
}