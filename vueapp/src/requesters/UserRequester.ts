import UserVM from "../viewmodels/UserVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import UserParser from "../parsers/UserParser.ts";

export default class UserRequester {
    public static async getLoggedInUserInfo(): Promise<UserVM> {
        try {
            const response = await axiosServer.get('/user');
            return UserParser.parseUser(response.data);
        } catch (error) {
            return null;
        }
    }

    public static async logout(): Promise<void> {
        await axiosServer.post('/logout');
    }
}