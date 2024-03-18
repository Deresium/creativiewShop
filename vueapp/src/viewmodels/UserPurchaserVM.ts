export default class UserPurchaserVM {
    private readonly userId: string;
    private readonly access: boolean;
    private readonly name: string;
    private readonly firstName: string;
    private readonly email: string;
    private readonly groupIdDiscount: string;


    constructor(userId: string, access: boolean, name: string, firstName: string, email: string, groupIdDiscount: string) {
        this.userId = userId;
        this.access = access;
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.groupIdDiscount = groupIdDiscount;
    }

    public getUserId(): string {
        return this.userId;
    }


    public getGroupIdDiscount(): string {
        return this.groupIdDiscount;
    }

    public getAccess(): boolean {
        return this.access;
    }

    public getName(): string {
        return this.name;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getEmail(): string {
        return this.email;
    }
}