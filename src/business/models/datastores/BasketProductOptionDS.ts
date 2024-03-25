export default class BasketProductOptionDS {
    private readonly basketId: string;
    private readonly productOptionId: string;
    private readonly quantity: number;


    constructor(basketId: string, productOptionId: string, quantity: number) {
        this.basketId = basketId;
        this.productOptionId = productOptionId;
        this.quantity = quantity;
    }

    getBasketId(): string {
        return this.basketId;
    }

    getProductOptionId(): string {
        return this.productOptionId;
    }

    getQuantity(): number {
        return this.quantity;
    }
}