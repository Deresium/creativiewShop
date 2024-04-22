export default class BasketProductOptionOrderVM {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly price: string;
    private readonly quantity: number;
    private readonly pictures: Array<string>;
    private readonly title: string;
    private readonly titleOption: string;
    private readonly description: string;
    private readonly total: string;


    constructor(productOptionId: string, productId: string, price: string, quantity: number, pictures: Array<string>, title: string, titleOption: string, description: string, total: string) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.pictures = pictures;
        this.title = title;
        this.titleOption = titleOption;
        this.description = description;
        this.total = total;
    }
}