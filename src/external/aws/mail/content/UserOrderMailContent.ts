import MailContent from "./MailContent";
import CustomerVM from "../../../../business/models/viewmodels/CustomerVM";
import BasketOrderVM from "../../../../business/models/viewmodels/BasketOrderVM";

export default class UserOrderMailContent extends MailContent {
    private readonly customer: CustomerVM;
    private readonly order: BasketOrderVM;


    constructor(language: string, customer: CustomerVM, order: BasketOrderVM) {
        super(language);
        this.customer = customer;
        this.order = order;
    }

    protected getBodyEn(separator: string): string {
        return `
        Resume of your order:${separator}
        ${this.getProductOptionList(separator)}
        `;
    }

    protected getBodyFr(separator: string): string {
        return `
        Résumé de la commande:${separator}
        ${this.getProductOptionList(separator)}
        `;
    }

    private getProductOptionList(separator: string): string {
        let response: string = '';
        for(const productOptionBasket of this.order.getBasketProductOptionOrders()){
            response = response + `${productOptionBasket.getQuantity()}x ${productOptionBasket.getTitle()} (prix unitaire: ${productOptionBasket.getPrice()} / total: ${productOptionBasket.getTotal()})  ${separator}`
        }
        return response;
    }

    protected getTitleEn(): string {
        return `Thank you for your order on ${this.customer.getName()}`;

    }

    protected getTitleFr(): string {
        return `Merci pour votre commande sur ${this.customer.getName()}`
    }

}