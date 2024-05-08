import UserPurchaserVM from "../viewmodels/UserPurchaserVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import UserPurchaserParser from "../parsers/UserPurchaserParser.ts";

export default class UserPurchaserRequester {
    public static async requestUserPurchasers(onlyWithAccess: boolean): Promise<Array<UserPurchaserVM>> {
        const response = await axiosServer.get('/user/purchaser', {
            params: {
                onlyWithAccess: onlyWithAccess
            }
        });
        return UserPurchaserParser.parseUserPurchasers(response.data);
    }

    public static async requestUserPurchasersInGroup(groupId: string): Promise<Array<UserPurchaserVM>> {
        const response = await axiosServer.get(`/group/${groupId}/users`);
        return UserPurchaserParser.parseUserPurchasers(response.data);
    }
}