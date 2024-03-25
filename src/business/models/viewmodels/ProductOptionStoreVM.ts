export default class ProductOptionStoreVM {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly hasStock: boolean;
    private readonly weight: number;
    private readonly manufacturer: string;
    private readonly preorder: boolean;
    private readonly basePrice: string;
    private readonly discountPrice: string;
    private readonly percent: string;
    private readonly startDateDiscount: string;
    private readonly endDateDiscount: string;
    private readonly title: string;
    private readonly description: string;
    private readonly pictures: Array<string>;
    private readonly otherOptions: Array<ProductOptionStoreVM>;


    constructor(productOptionId: string, productId: string, hasStock: boolean, weight: number, manufacturer: string, preorder: boolean, basePrice: string, discountPrice: string, percent: string, startDateDiscount: string, endDateDiscount: string, title: string, description: string, pictures: Array<string>, otherOptions: Array<ProductOptionStoreVM>) {
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