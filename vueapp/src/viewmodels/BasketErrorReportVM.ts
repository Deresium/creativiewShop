import BasketErrorVM from "./BasketErrorVM.ts";

export default class BasketErrorReportVM {
    private readonly productOptionErrors: Array<BasketErrorVM>;
    private readonly basketErrors: Array<BasketErrorVM>;

    constructor(productOptionErrors: Array<BasketErrorVM>, basketErrors: Array<BasketErrorVM>) {
        this.productOptionErrors = productOptionErrors;
        this.basketErrors = basketErrors;
    }

    public hasErrors() {
        return this.productOptionErrors.length > 0 || this.basketErrors.length > 0;
    }


    public getProductOptionErrors(): Array<BasketErrorVM> {
        return this.productOptionErrors;
    }

    public getBasketErrors(): Array<BasketErrorVM> {
        return this.basketErrors;
    }
}