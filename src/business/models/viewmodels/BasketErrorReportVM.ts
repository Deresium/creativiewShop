import BasketErrorVM from "./BasketErrorVM";

export default class BasketErrorReportVM {
    private readonly productOptionErrors: Array<BasketErrorVM>;
    private readonly basketErrors: Array<BasketErrorVM>;


    constructor() {
        this.productOptionErrors = new Array<BasketErrorVM>();
        this.basketErrors = new Array<BasketErrorVM>();
    }

    public addErrorToProductOptionErrors(error: BasketErrorVM) {
        this.productOptionErrors.push(error);
    }

    public addErrorToBasketErrors(error: BasketErrorVM) {
        this.basketErrors.push(error);
    }

    public hasErrors() {
        return this.productOptionErrors.length > 0 || this.basketErrors.length > 0;
    }
}