import ProductOptionBasketVM from "./ProductOptionBasketVM";

export default class BasketVM {
    private readonly basketId: string;
    private readonly productOptionStores: Array<ProductOptionBasketVM>;
    private readonly total: string;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketVM>, total: string) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.total = total;
    }
}