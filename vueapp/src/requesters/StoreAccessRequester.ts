import axiosServer from "../axios/axiosServer.ts";

export default class StoreAccessRequester {
    public static async requestStoreAccess(): Promise<boolean> {
        const response = await axiosServer.get('/store/storeAccess');
        return response.data;
    }
}