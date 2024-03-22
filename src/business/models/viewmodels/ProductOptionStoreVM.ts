export default class ProductOptionStoreVM {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly hasStock: boolean;
    private readonly weight: number;
    private readonly manufacturer: string;
    private readonly preorder: boolean;
    private readonly basePrice: number;
    private readonly discountPrice: number;
    private readonly percent: number;
    private readonly startDateDiscount: Date;
    private readonly endDateDiscount: Date;
    private readonly title: string;
    private readonly description: string;
    private readonly pictures: Array<string>;
    private readonly otherOptions: Array<ProductOptionStoreVM>;


    constructor(productOptionId: string, productId: string, hasStock: boolean, weight: number, manufacturer: string, preorder: boolean, basePrice: number, discountPrice: number, percent: number, startDateDiscount: Date, endDateDiscount: Date, title: string, description: string, pictures: Array<string>, otherOptions: Array<ProductOptionStoreVM>) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.hasStock = hasStock;
        this.weight = weight;
        this.manufacturer = manufacturer;
        this.preorder = preorder;
        this.basePrice = basePrice;
        this.discountPrice = discountPrice;
        this.percent = percent;
        this.startDateDiscount = startDateDiscount;
        this.endDateDiscount = endDateDiscount;
        this.title = title;
        this.description = description;
        this.pictures = pictures;
        this.otherOptions = otherOptions;
    }
}