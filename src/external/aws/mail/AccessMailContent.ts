import MailContent from "./MailContent";
import CustomerVM from "../../../business/models/viewmodels/CustomerVM";
import UserEmailVM from "../../../business/models/viewmodels/UserEmailVM";

export default class AccessMailContent extends MailContent {
    private readonly customer: CustomerVM;
    private readonly user: UserEmailVM;


    constructor(language: string, customer: CustomerVM, user: UserEmailVM) {
        super(language);
        this.customer = customer;
        this.user = user;
    }

    protected getBodyEn(separator: string): string {
        return `
        You subscription to ${this.customer.getName()} has been accepted.${separator}
        You can log in to <a href="https://www.${this.customer.getDnsName()}">${this.customer.getDnsName()}</a> .${separator}
        Enjoy your visit ! ${separator}
        ${this.customer.getName()} Team.
        `;
    }

    protected getBodyFr(separator: string): string {
        return `
        Votre inscription sur ${this.customer.getName()} a été acceptée.${separator}
        Vous pouvez vous connecter sur <a href=https://www.${this.customer.getDnsName()}>${this.customer.getDnsName()}</a> .${separator}
        Bonne visite ! ${separator}
        L'équipe ${this.customer.getName()}.
        `;
    }

    protected getTitleEn(): string {
        return `Welcome to ${this.customer.getName()} ${this.user.getFirstName()} ${this.user.getName()}`;
    }

    protected getTitleFr(): string {
        return `Bienvenue sur ${this.customer.getName()} ${this.user.getFirstName()} ${this.user.getName()}`;
    }
}