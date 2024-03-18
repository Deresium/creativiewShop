import MailContent from "./MailContent";
import UserEmailVM from "../../../business/models/viewmodels/UserEmailVM";
import CustomerVM from "../../../business/models/viewmodels/CustomerVM";

export default class NewUserAccountMailContent extends MailContent {
    private readonly user: UserEmailVM;
    private readonly customer: CustomerVM;

    constructor(language: string, user: UserEmailVM, customer: CustomerVM) {
        super(language);
        this.user = user;
        this.customer = customer;
    }

    protected getBodyEn(separator: string): string {
        return `
        A new user subscribed on ${this.customer.getName()}. ${separator}
        Don't forget his access on <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a> .
        `
    }

    protected getBodyFr(separator: string): string {
        return `
        Un nouvel utilisateur s'est inscrit sur ${this.customer.getName()}. ${separator}
        Pensez à lui donner son accès sur <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a> .
        `
    }

    protected getTitleEn(): string {
        return `New user on ${this.customer.getName()}: ${this.user.getFirstName()} ${this.user.getName()}`;
    }

    protected getTitleFr(): string {
        return `Nouvel utilisateur sur ${this.customer.getName()}: ${this.user.getFirstName()} ${this.user.getName()}`;
    }

}