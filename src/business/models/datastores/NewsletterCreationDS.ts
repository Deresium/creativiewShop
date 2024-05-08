export default class NewsletterCreationDS {
    private readonly customerId: number;
    private readonly object: string;
    private readonly content: string;
    private readonly userIds: Array<string>;
    private readonly groupIds: Array<string>;
    private readonly sendToAllUsers: boolean;


    constructor(customerId: number, object: string, content: string, userIds: Array<string>, groupIds: Array<string>, sendToAllUsers: boolean) {
        this.customerId = customerId;
        this.object = object;
        this.content = content;
        this.userIds = userIds;
        this.groupIds = groupIds;
        this.sendToAllUsers = sendToAllUsers;
    }


    public getCustomerId(): number {
        return this.customerId;
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