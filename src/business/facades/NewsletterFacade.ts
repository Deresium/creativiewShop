import INewsletterRequester from "../requesters/INewsletterRequester";
import NewsletterCreationDS from "../models/datastores/NewsletterCreationDS";
import INewsletterDataGateway from "../../database/gateways/INewsletterDataGateway";
import IUserDataGateway from "../../database/gateways/IUserDataGateway";
import IUserGroupDataGateway from "../../database/gateways/IUserGroupDataGateway";
import ISendMailDataGateway from "../../external/aws/mail/ISendMailDataGateway";

export default class NewsletterFacade implements INewsletterRequester {
    private readonly newsletterDataGateway: INewsletterDataGateway;
    private readonly userDataGateway: IUserDataGateway;
    private readonly userGroupDataGateway: IUserGroupDataGateway;
    private readonly sendMailDataGateway: ISendMailDataGateway;


    constructor(newsletterDataGateway: INewsletterDataGateway, userDataGateway: IUserDataGateway, userGroupDataGateway: IUserGroupDataGateway, sendMailDataGateway: ISendMailDataGateway) {
        this.newsletterDataGateway = newsletterDataGateway;
        this.userDataGateway = userDataGateway;
        this.userGroupDataGateway = userGroupDataGateway;
        this.sendMailDataGateway = sendMailDataGateway;
    }

    public async createNewsletter(newsletterCreation: NewsletterCreationDS): Promise<void> {
        const listMailsToSend = await this.getListEmails(newsletterCreation);
        if (listMailsToSend.size === 0) {
            throw new Error('newsletter.noEmail');
        }

        await this.sendMailDataGateway.sendEmailNewsletter(newsletterCreation.getCustomer(), newsletterCreation.getObject(), newsletterCreation.getContent(), Array.from(listMailsToSend));
        await this.newsletterDataGateway.addNewsletter(newsletterCreation);
    }

    private async getListEmails(newsletterCreation: NewsletterCreationDS): Promise<Set<string>> {
        const emails = new Set<string>();

        if (newsletterCreation.getSendToAllUsers()) {
            const users = await this.userDataGateway.findUserPurchasers(newsletterCreation.getCustomerId(), true);
            for (const user of users) {
                emails.add(user.getEmail());
            }
            return emails;
        }

        if (newsletterCreation.getUserIds()) {
            for (const userId of newsletterCreation.getUserIds()) {
                const user = await this.userDataGateway.findUserById(userId, newsletterCreation.getCustomerId());
                if (user) {
                    emails.add(user.getEmail());
                }
            }
        }

        if (newsletterCreation.getGroupIds()) {
            for (const groupId of newsletterCreation.getGroupIds()) {
                const usersGroup = await this.userGroupDataGateway.findUsersInGroup(newsletterCreation.getCustomerId(), groupId);
                for (const userGroup of usersGroup) {
                    emails.add(userGroup.getUser().getEmail());
                }
            }
        }

        return emails;
    }
}