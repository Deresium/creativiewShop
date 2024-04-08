import BasketErrorReportVM from "../viewmodels/BasketErrorReportVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import BasketErrorReportParser from "../parsers/BasketErrorReportParser.ts";

export default class BasketErrorReportRequester {
    public static async requestBasketErrorReport(): Promise<BasketErrorReportVM> {
        const response = await axiosServer.get('/checkBasket');
        return BasketErrorReportParser.parseBasketErrorReport(response.data);
    }
}