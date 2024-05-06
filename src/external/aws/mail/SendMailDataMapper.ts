import ISendMailDataGateway from "./ISendMailDataGateway";
import CustomerVM from "../../../business/models/viewmodels/CustomerVM";
import AccessMailContent from "./content/AccessMailContent";
import MailSender from "./MailSender";
import UserEmailVM from "../../../business/models/viewmodels/UserEmailVM";
import NewUserAccountMailContent from "./content/NewUserAccountMailContent";
import ForgotPasswordMailContent from "./content/ForgotPasswordMailContent";
import BasketOrderVM from "../../../business/models/viewmodels/BasketOrderVM";
import NewOrderMailContent from "./content/NewOrderMailContent";
import UserOrderMailContent from "./content/UserOrderMailContent";
import CustomerBankVM from "../../../business/models/viewmodels/CustomerBankVM";

export default class SendMailDataMapper implements ISendMailDataGateway {
    public async sendEmailUserAccess(user: UserEmailVM, customer: CustomerVM): Promise<void> {
        const mail = new AccessMailContent(user.getLanguage(), customer, user);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), [user.getEmail()]);
    }

    public async sendEmailNewUserAccount(user: UserEmailVM, customer: CustomerVM, userAdminStoreEmail: Array<string>, language: string): Promise<void> {
        const mail = new NewUserAccountMailContent(language, user, customer);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), userAdminStoreEmail);
    }

    public async sendEmailForgotPassword(customer: CustomerVM, uuid: string, to: string, language: string): Promise<void> {
        const mail = new ForgotPasswordMailContent(language, customer, uuid);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), [to]);
    }

    public async sendEmailNewOrder(customer: CustomerVM, basket: BasketOrderVM, userAdminStoreEmail: Array<string>, language: string): Promise<void> {
        const mail = new NewOrderMailContent(language, customer, basket);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), userAdminStoreEmail);
    }

    public async sendEmailUserOrder(customer: CustomerVM, basket: BasketOrderVM, customerBank: CustomerBankVM, to: string, language: string, paypalLink: string, paypalQrCode: string): Promise<void> {
        const mail = new UserOrderMailContent(language, customer, basket, customerBank, paypalLink, paypalQrCode);
        await MailSender.sendEmail(mail.getTitle(), mail.getBody(true), mail.getBody(false), customer.getEmailFrom(), [to]);
    }
}