import IPaymentMethodRequester from "../requesters/IPaymentMethodRequester";
import TitleValueVM from "../models/viewmodels/TitleValueVM";
import IPaymentMethodDataGateway from "../../database/gateways/IPaymentMethodDataGateway";

export default class PaymentMethodFacade implements IPaymentMethodRequester {
    private readonly paymentMethodDataGateway: IPaymentMethodDataGateway;

    constructor(paymentMethodDataGateway: IPaymentMethodDataGateway) {
        this.paymentMethodDataGateway = paymentMethodDataGateway;
    }

    public async getPaymentMethodsForCustomer(customerId: number): Promise<Array<TitleValueVM<string, string>>> {
        const paymentMethods = await this.paymentMethodDataGateway.getPaymentMethodForCustomer(customerId);
        return paymentMethods.map(paymentMethod => new TitleValueVM<string, string>(`paymentMethod.${paymentMethod.getPaymentMethodCode()}`, paymentMethod.getPaymentMethodCode()));
    }
}