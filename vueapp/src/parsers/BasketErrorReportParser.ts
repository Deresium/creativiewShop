import BasketErrorVM from "../viewmodels/BasketErrorVM.ts";
import BasketErrorReportVM from "../viewmodels/BasketErrorReportVM.ts";

export default class BasketErrorReportParser {
    public static parseBasketErrorReport(data: any): BasketErrorReportVM {
        const basketErrors = BasketErrorReportParser.parseBasketErrors(data.basketErrors);
        const productOptionErrors = BasketErrorReportParser.parseBasketErrors(data.productOptionErrors);
        return new BasketErrorReportVM(productOptionErrors, basketErrors);
    }

    private static parseBasketErrors(data: any): Array<BasketErrorVM> {
        return data.map((basketError: any) => new BasketErrorVM(basketError.id, basketError.label, basketError.reason));
    }
}