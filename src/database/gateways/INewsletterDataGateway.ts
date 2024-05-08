import NewsletterCreationDS from "../../business/models/datastores/NewsletterCreationDS";

export default interface INewsletterDataGateway {
    addNewsletter(newsletterCreation: NewsletterCreationDS): Promise<void>;
}