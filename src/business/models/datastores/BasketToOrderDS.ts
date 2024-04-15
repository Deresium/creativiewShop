export default class BasketToOrderDS {
    private readonly basketId: string;
    private readonly totalWeight: number;
    private readonly productOptionStocks: Map<string, number>;
    private readonly basketProductOptionPrice: Map<string, number>;


    constructor(basketId: string, totalWeight: number, productOptionStocks: Map<string, number>, basketProductOptionPrice: Map<string, number>) {
        this.basketId = basketId;
        this.totalWeight = totalWeight;
        this.productOptionStocks = productOptionStocks;
        this.basketProductOptionPrice = basketProductOptionPrice;
    }


    getBasketId(): string {
        return this.basketId;
    }

    getTotalWeight(): number {
        return this.totalWeight;
    }

    getProductOptionStocks(): Map<string, number> {
        return this.productOptionStocks;
    }

    getBasketProductOptionPrice(): Map<string, number> {
        return this.basketProductOptionPrice;
    }
}