import MailContent from "./MailContent";
import CustomerVM from "../../../../business/models/viewmodels/CustomerVM";
import BasketOrderVM from "../../../../business/models/viewmodels/BasketOrderVM";

export default class NewOrderMailContent extends MailContent {
    private readonly customer: CustomerVM;
    private readonly order: BasketOrderVM;


    constructor(language: string, customer: CustomerVM, order: BasketOrderVM) {
        super(language);
        this.customer = customer;
        this.order = order;
    }

    protected getBodyEn(separator: string): string {
        return `
        A new order arrived from ${this.order.getFirstName()} ${this.order.getName()}. ${separator}
        You can contact him by email: <a href="mailto:${this.order.getEmail()}">${this.order.getEmail()}</a>. ${separator}
        Consult his order on <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a>
        `;
    }

    protected getBodyFr(separator: string): string {
        return `
        Une nouvelle commande est arrivée de ${this.order.getFirstName()} ${this.order.getName()}. ${separator}
        Vous pouvez le contacter par email: <a href="mailto:${this.order.getEmail()}">${this.order.getEmail()}</a>. ${separator}
        Consultez sa commande sur <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a>
        `;
    }

    protected getTitleEn(): string {
        return `New order from ${this.order.getFirstName()} ${this.order.getName()}`;
    }

    protected getTitleFr(): string {
        return `Nouvelle commande de ${this.order.getFirstName()} ${this.order.getName()}`;
    }

}