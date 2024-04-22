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


    public getProductOptionId(): string {
        return this.productOptionId;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getPrice(): string {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getPictures(): Array<string> {
        return this.pictures;
    }

    public getPictureId(): string {
        if (this.pictures && this.pictures.length > 0) {
            return this.pictures[0];
        }
        return null;
    }

    public getTitle(): string {
        return this.title;
    }

    public getTotal(): string {
        return this.total;
    }
}