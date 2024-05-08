import NewsletterCreationDS from "../models/datastores/NewsletterCreationDS";

export default interface INewsletterRequester {
    createNewsletter(newsletterCreation: NewsletterCreationDS): Promise<void>;
}