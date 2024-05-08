import INewsletterDataGateway from "../gateways/INewsletterDataGateway";
import NewsletterCreationDS from "../../business/models/datastores/NewsletterCreationDS";
import DatabaseSingleton from "../DatabaseSingleton";
import {Transaction} from "sequelize";
import NewsletterEntity from "../entities/NewsletterEntity";
import NewsletterGroupEntity from "../entities/NewsletterGroupEntity";
import NewsletterUserEntity from "../entities/NewsletterUserEntity";

export default class NewsletterDataMapper implements INewsletterDataGateway {
    public async addNewsletter(newsletterCreation: NewsletterCreationDS): Promise<void> {
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {
            const newsletter = await NewsletterEntity.create({
                object: newsletterCreation.getObject(),
                content: newsletterCreation.getContent(),
                sendToAllUsers: newsletterCreation.getSendToAllUsers(),
                customerId: newsletterCreation.getCustomerId()
            }, {
                transaction: t
            });

            for (const groupId of newsletterCreation.getGroupIds()) {
                await NewsletterGroupEntity.create({
                    newsletterId: newsletter.getNewsletterId(),
                    groupId: groupId
                }, {
                    transaction: t
                })
            }

            for (const userId of newsletterCreation.getUserIds()) {
                await NewsletterUserEntity.create({
                    newsletterId: newsletter.getNewsletterId(),
                    userId: userId
                }, {
                    transaction: t
                });
            }
        });
    }
}