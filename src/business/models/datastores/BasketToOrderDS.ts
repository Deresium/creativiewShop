import Decimal from "decimal.js";

export default class BasketToOrderDS {
    private readonly basketId: string;
    private readonly currency: string;
    private readonly totalWeight: Decimal;
    private readonly productOptionStocks: Map<string, number>;
    private readonly basketProductOptionPrice: Map<string, Decimal>;


    constructor(basketId: string, currency: string, totalWeight: Decimal, productOptionStocks: Map<string, number>, basketProductOptionPrice: Map<string, Decimal>) {
        this.basketId = basketId;
        this.currency = currency;
        this.totalWeight = totalWeight;
        this.productOptionStocks = productOptionStocks;
        this.basketProductOptionPrice = basketProductOptionPrice;
    }


    getBasketId(): string {
        return this.basketId;
    }


    public getCurrency(): string {
        return this.currency;
    }

    getTotalWeight(): Decimal {
        return this.totalWeight;
    }

    getProductOptionStocks(): Map<string, number> {
        return this.productOptionStocks;
    }

    getBasketProductOptionPrice(): Map<string, Decimal> {
        return this.basketProductOptionPrice;
    }
}