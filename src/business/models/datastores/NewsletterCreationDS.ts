import CustomerVM from "../viewmodels/CustomerVM";

export default class NewsletterCreationDS {
    private readonly customer: CustomerVM;
    private readonly object: string;
    private readonly content: string;
    private readonly userIds: Array<string>;
    private readonly groupIds: Array<string>;
    private readonly sendToAllUsers: boolean;


    constructor(customer: CustomerVM, object: string, content: string, userIds: Array<string>, groupIds: Array<string>, sendToAllUsers: boolean) {
        this.customer = customer;
        this.object = object;
        this.content = content;
        this.userIds = userIds;
        this.groupIds = groupIds;
        this.sendToAllUsers = sendToAllUsers;
    }


    public getCustomerId(): number {
        return this.customer.getCustomerId();
    }

    public getCustomer() {
        return this.customer;
    }

    public getObject(): string {
        return this.object;
    }

    public getContent(): string {
        return this.content;
    }

    public getUserIds(): Array<string> {
        return this.userIds;
    }

    public getGroupIds(): Array<string> {
        return this.groupIds;
    }

    public getSendToAllUsers(): boolean {
        return this.sendToAllUsers;
    }
}