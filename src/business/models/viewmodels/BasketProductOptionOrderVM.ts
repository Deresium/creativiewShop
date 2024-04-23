export default class BasketProductOptionOrderVM {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly price: string;
    private readonly quantity: number;
    private readonly pictures: Array<string>;
    private readonly title: string;
    private readonly total: string;


    constructor(productOptionId: string, productId: string, price: string, quantity: number, pictures: Array<string>, title: string, total: string) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.pictures = pictures;
        this.title = title;
        this.total = total;
    }


    getPrice(): string {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTitle(): string {
        return this.title;
    }

    getTotal(): string {
        return this.total;
    }
}