export default class UserLoginVM {
    private readonly userId: string;
    private readonly userGroups: Array<string>;


    constructor(userId: string, userGroups: Array<string>) {
        this.userId = userId;
        this.userGroups = userGroups;
    }


    public getUserId(): string {
        return this.userId;
    }

    public getUserGroups() {
        return this.userGroups;
    }
}