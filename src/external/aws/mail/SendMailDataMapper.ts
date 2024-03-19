import ISendMailDataGateway from "./ISendMailDataGateway";
import CustomerVM from "../../../business/models/viewmodels/CustomerVM";
import AccessMailContent from "./content/AccessMailContent";
import MailSender from "./MailSender";
import UserEmailVM from "../../../business/models/viewmodels/UserEmailVM";
import NewUserAccountMailContent from "./content/NewUserAccountMailContent";
import ForgotPasswordMailContent from "./content/ForgotPasswordMailContent";

export default class SendMailDataMapper implements ISendMailDataGateway {
    public async sendEmailUserAccess(user: UserEmailVM, customer: CustomerVM): Promise<void> {
        const mail = new AccessMailContent(user.getLanguage(), customer, user);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), [user.getEmail()]);
    }

    public async sendEmailNewUserAccount(user: UserEmailVM, customer: CustomerVM, userAdminStoreEmail: Array<string>): Promise<void> {
        const mail = new NewUserAccountMailContent('fr', user, customer);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), userAdminStoreEmail);
    }

    public async sendEmailForgotPassword(customer: CustomerVM, uuid: string, to: string, language: string): Promise<void> {
        const mail = new ForgotPasswordMailContent(language, customer, uuid);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), [to]);
    }
}