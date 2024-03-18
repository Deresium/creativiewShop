import UserPurchaserVM from "../viewmodels/UserPurchaserVM.ts";

export default class UserPurchaserParser {
    public static parseUserPurchasers(data: any): Array<UserPurchaserVM> {
        return data.map((user: any) => UserPurchaserParser.parseUserPurchaser(user));
    }

    public static parseUserPurchaser(data: any): UserPurchaserVM {
        return new UserPurchaserVM(data.userId, data.access, data.name, data.firstName, data.email, data.groupIdDiscount);
    }
}