import IPaymentMethodRequester from "../requesters/IPaymentMethodRequester";
import TitleValueVM from "../models/viewmodels/TitleValueVM";
import IPaymentMethodDataGateway from "../../database/gateways/IPaymentMethodDataGateway";
import DataEncrypt from "../utils/DataEncrypt";
import PaymentMethodCustomerVM from "../models/viewmodels/PaymentMethodCustomerVM";
import QRCode from 'qrcode';

export default class PaymentMethodFacade implements IPaymentMethodRequester {
    private readonly paymentMethodDataGateway: IPaymentMethodDataGateway;

    constructor(paymentMethodDataGateway: IPaymentMethodDataGateway) {
        this.paymentMethodDataGateway = paymentMethodDataGateway;
    }

    public async getPaymentMethodsForCustomer(customerId: number): Promise<Array<TitleValueVM<string, string>>> {
        const paymentMethods = await this.paymentMethodDataGateway.getPaymentMethodForCustomer(customerId);
        return paymentMethods.map(paymentMethod => new TitleValueVM<string, string>(`paymentMethod.${paymentMethod.getPaymentMethodCode()}`, paymentMethod.getPaymentMethodCode()));
    }

    public async updateKeySecretForCustomerOnlinePayment(key: string, secret: string, customerId: number): Promise<void> {
        const encryptedKey = new DataEncrypt().encrypt(key);
        const encryptedSecret = new DataEncrypt().encrypt(secret);
        await this.paymentMethodDataGateway.updateKeySecretForCustomerOnlinePayment(encryptedKey, encryptedSecret, customerId);
    }

    public async getPaymentMethodInfoOnlineCustomer(): Promise<Array<PaymentMethodCustomerVM>> {
        const paymentMethodOnlineCustomers = await this.paymentMethodDataGateway.getPaymentMethodCustomerByPaymentMethod('ONLINE');

        const paymentMethodCustomersVM = new Array<PaymentMethodCustomerVM>();
        if (!paymentMethodOnlineCustomers && paymentMethodOnlineCustomers.length === 0) {
            return paymentMethodCustomersVM;
        }

        for (const paymentMethodOnlineCustomer of paymentMethodOnlineCustomers) {
            const decryptedKey = new DataEncrypt().decrypt(paymentMethodOnlineCustomer.getKey());
            const paymentMethodCustomerVM = new PaymentMethodCustomerVM(paymentMethodOnlineCustomer.getCustomerId(), paymentMethodOnlineCustomer.getCustomerName(), decryptedKey, paymentMethodOnlineCustomer.getSecret());
            paymentMethodCustomersVM.push(paymentMethodCustomerVM);
        }

        return paymentMethodCustomersVM;
    }

    public async getPaypalMeURL(customerId: number, total: string, currency: string): Promise<string> {
        const paymentMethodPaypal = await this.paymentMethodDataGateway.getPaymentMethodCustomerById(customerId, 'PAYPAL_ME');
        if (!paymentMethodPaypal) {
            return null;
        }

        return `https://www.paypal.com/paypalme/${paymentMethodPaypal.getKey()}/${total}${currency}`;
    }

    public async getPaypalQrCode(customerId: number, total: string, currency: string): Promise<string> {
        const url = await this.getPaypalMeURL(customerId, total, currency);
        return await QRCode.toDataURL(url);
    }


}