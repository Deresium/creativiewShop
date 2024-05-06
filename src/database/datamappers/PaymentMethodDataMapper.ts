import IPaymentMethodDataGateway from "../gateways/IPaymentMethodDataGateway";
import PaymentMethodCustomerEntity from "../entities/PaymentMethodCustomerEntity";
import CustomerEntity from "../entities/CustomerEntity";

export default class PaymentMethodDataMapper implements IPaymentMethodDataGateway {

    public async getPaymentMethodForCustomer(customerId: number): Promise<Array<PaymentMethodCustomerEntity>> {
        return await PaymentMethodCustomerEntity.findAll({
            where: {
                customerId: customerId,
            }
        });
    }

    public async getPaymentMethodCustomerByPaymentMethod(paymentMethod: string): Promise<Array<PaymentMethodCustomerEntity>> {
        return await PaymentMethodCustomerEntity.findAll({
            where: {
                paymentMethodCode: paymentMethod
            },
            include: [{model: CustomerEntity, as: 'customer'}]
        });
    }

    public async updateKeySecretForCustomerOnlinePayment(encryptedKey: string, encryptedSecret: string, customerId: number): Promise<void> {
        await PaymentMethodCustomerEntity.update({
            key: encryptedKey,
            secret: encryptedSecret
        }, {
            where: {
                customerId: customerId,
                paymentMethodCode: 'ONLINE'
            }
        });
    }

    public async getPaymentMethodCustomerById(customerId: number, paymentMethod: string): Promise<PaymentMethodCustomerEntity> {
        return await PaymentMethodCustomerEntity.findOne({
            where: {
                paymentMethodCode: paymentMethod,
                customerId: customerId
            }
        });
    }
}