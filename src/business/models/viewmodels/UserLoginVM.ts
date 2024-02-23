export default class UserLoginVM {
    private readonly userId: bigint;
    private readonly role: string;


    constructor(userId: bigint, role: string) {
        this.userId = userId;
        this.role = role;
    }


    public getUserId(): bigint {
        return this.userId;
    }

    public getRole(): string {
        return this.role;
    }
}