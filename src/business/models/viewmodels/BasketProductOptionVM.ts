export default class BasketProductOptionVM{
    private readonly productOptionId: string;
    private readonly quantity: number;


    constructor(productOptionId: string, quantity: number) {
        this.productOptionId = productOptionId;
        this.quantity = quantity;
    }
}