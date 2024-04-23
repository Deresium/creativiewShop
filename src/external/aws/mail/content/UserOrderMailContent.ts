import MailContent from "./MailContent";
import CustomerVM from "../../../../business/models/viewmodels/CustomerVM";
import BasketOrderVM from "../../../../business/models/viewmodels/BasketOrderVM";
import CustomerBankVM from "../../../../business/models/viewmodels/CustomerBankVM";

export default class UserOrderMailContent extends MailContent {
    private readonly customer: CustomerVM;
    private readonly order: BasketOrderVM;
    private readonly customerBank: CustomerBankVM;

    constructor(language: string, customer: CustomerVM, order: BasketOrderVM, customerBank: CustomerBankVM) {
        super(language);
        this.customer = customer;
        this.order = order;
        this.customerBank = customerBank;
    }

    protected getBodyEn(separator: string): string {
        return `
        Resume of your order:${separator}
        ${this.getProductOptionList(separator)}
        ${separator}
        Delivery price: ${this.order.getDeliveryPrice()} ${this.order.getCurrencySymbol()}${separator}
        ${separator}
        Total: ${this.order.getTotalPrice()} ${this.order.getCurrencySymbol()}${separator}
        ${separator}
        ${this.getPaymentBankTransferInfoEn(separator)}
        ${separator}
        Find all the information about your order on <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a>
        `;
    }

    protected getBodyFr(separator: string): string {
        return `
        Résumé de la commande:${separator}
        ${this.getProductOptionList(separator)}
        ${separator}
        Prix de la livraison: ${this.order.getDeliveryPrice()} ${this.order.getCurrencySymbol()}${separator}
        ${separator}
        Total: ${this.order.getTotalPrice()} ${this.order.getCurrencySymbol()}${separator}
        ${separator}
        ${this.getPaymentBankTransferInfoFr(separator)}
        ${separator}
        Retrouvez toutes les informations de votre commande sur <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a>
        `;
    }

    protected getTitleEn(): string {
        return `Thank you for your order on ${this.customer.getName()}`;

    }

    protected getTitleFr(): string {
        return `Merci pour votre commande sur ${this.customer.getName()}`
    }

    private getProductOptionList(separator: string): string {
        let response: string = '';
        for (const productOptionBasket of this.order.getBasketProductOptionOrders()) {
            response += `${productOptionBasket.getQuantity()}x ${productOptionBasket.getTitle()} (prix unitaire: ${productOptionBasket.getPrice()} ${this.order.getCurrencySymbol()} / total: ${productOptionBasket.getTotal()} ${this.order.getCurrencySymbol()})  ${separator}`
        }
        return response;
    }

    private getPaymentBankTransferInfoFr(separator: string) {
        if (this.order.getPaymentMethod() === 'BANK_TRANSFER') {
            return `
            Informations de paiement par virement${separator}
            ${this.customerBank.getName()}${separator}
            ${this.customerBank.getStreet()} ${this.customerBank.getStreetNumber()} ${this.getBox()}${separator}
            ${this.customerBank.getZipCode()} ${this.customerBank.getCity()}${separator}
            ${this.customerBank.getCountryName()}${separator}
            ${separator}
            Hors de l'UE${separator}
            ${this.customerBank.getAccountLabel()}${separator}
            ${separator}
            Au sein de l'UE${separator}
            IBAN: ${this.customerBank.getIban()}${separator}
            BIC: ${this.customerBank.getBic()}
            `;
        }
        return '';
    }

    private getPaymentBankTransferInfoEn(separator: string) {
        if (this.order.getPaymentMethod() === 'BANK_TRANSFER') {
            return `
            Bank transfer information${separator}
            ${this.customerBank.getName()}${separator}
            ${this.customerBank.getStreet()} ${this.customerBank.getStreetNumber()} ${this.getBox()}${separator}
            ${this.customerBank.getZipCode()} ${this.customerBank.getCity()}${separator}
            ${this.customerBank.getCountryName()}${separator}
            ${separator}
            Outside of UE${separator}
            ${this.customerBank.getAccountLabel()}${separator}
            ${separator}
            Inside of UE${separator}
            IBAN: ${this.customerBank.getIban()}${separator}
            BIC: ${this.customerBank.getBic()}
            `;
        }
        return '';
    }

    private getBox(): string {
        if (this.customerBank.getBox()) {
            return `(${this.customerBank.getBox()})`
        }
        return '';
    }

}