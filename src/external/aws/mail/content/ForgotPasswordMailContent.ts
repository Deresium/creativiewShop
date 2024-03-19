import MailContent from "./MailContent";
import CustomerVM from "../../../../business/models/viewmodels/CustomerVM";
export default class ForgotPasswordMailContent extends MailContent {
    private readonly customer: CustomerVM;
    private readonly uuid: string;

    constructor(language: string, customer: CustomerVM, uuid: string) {
        super(language);
        this.customer = customer;
        this.uuid = uuid;
    }

    protected getBodyEn(separator: string): string {
        return `Please click on the following link to be redirected to the change password page: <a href="https://www.${this.customer.getDnsName()}/newPassword?uuid=${this.uuid}">${this.customer.getDnsName()}/newPassword</a>`;
    }

    protected getBodyFr(separator: string): string {
        return `Veuillez cliquer sur le lien suivant afin d'être redirigé vers la page de changement de mot de passe: <a href="https://www.${this.customer.getDnsName()}/newPassword?uuid=${this.uuid}">${this.customer.getDnsName()}/nouveauMotdepasse</a>\``;
    }

    protected getTitleEn(): string {
        return `Your new password request from ${this.customer.getName()}`;
    }

    protected getTitleFr(): string {
        return `Votre nouvelle demande de mot de passe de ${this.customer.getName()}`;
    }
}