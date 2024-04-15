export default class ProductOptionBasketDS {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly hasStock: boolean;
    private readonly weight: number;
    private readonly quantity: number;


    constructor(productOptionId: string, productId: string, hasStock: boolean, weight: number, quantity: number) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.hasStock = hasStock;
        this.weight = weight;
        this.quantity = quantity;
    }
}