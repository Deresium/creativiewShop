import UserPurchaserVM from "../viewmodels/UserPurchaserVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import UserPurchaserParser from "../parsers/UserPurchaserParser.ts";

export default class UserPurchaserRequester {
    public static async requestUserPurchasers(): Promise<Array<UserPurchaserVM>> {
        const response = await axiosServer.get('/user/purchaser');
        return UserPurchaserParser.parseUserPurchasers(response.data);
    }

    public static async requestUserPurchasersInGroup(groupId: string): Promise<Array<UserPurchaserVM>> {
        const response = await axiosServer.get(`/group/${groupId}/users`);
        return UserPurchaserParser.parseUserPurchasers(response.data);
    }
}