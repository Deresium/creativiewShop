import BasketErrorVM from "./BasketErrorVM";

export default class BasketErrorReportVM {
    private readonly productOptionErrors: Array<BasketErrorVM>;


    constructor() {
        this.productOptionErrors = new Array<BasketErrorVM>();
    }

    public addErrorToProductOptionErrors(error: BasketErrorVM){
        this.productOptionErrors.push(error);
    }

    public hasErrors(){
        return this.productOptionErrors.length > 0;
    }
}