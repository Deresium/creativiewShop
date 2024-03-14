export default class UserPurchaserVM {
    private readonly userId: string;
    private readonly groupIdDiscount: string;
    private readonly access: boolean
    private readonly name: string;
    private readonly firstName: string;
    private readonly email: string;


    constructor(userId: string, groupIdDiscount: string, access: boolean, name: string, firstName: string, email: string) {
        this.userId = userId;
        this.groupIdDiscount = groupIdDiscount;
        this.access = access;
        this.name = name;
        this.firstName = firstName;
        this.email = email;
    }
}
