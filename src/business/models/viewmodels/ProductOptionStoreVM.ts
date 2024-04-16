import TitleValueVM from "./TitleValueVM";

export default class ProductOptionStoreVM {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly hasStock: boolean;
    private readonly weight: number;
    private readonly manufacturerId: string;
    private readonly manufacturer: string;
    private readonly preorder: boolean;
    private readonly basePrice: string;
    private readonly discountPrice: string;
    private readonly percent: string;
    private readonly startDateDiscount: string;
    private readonly endDateDiscount: string;
    private readonly title: string;
    private readonly titleOption: string;
    private readonly description: string;
    private readonly pictures: Array<string>;
    private readonly allOptions: Array<TitleValueVM<string, string>>;


    constructor(productOptionId: string, productId: string, hasStock: boolean, weight: number, manufacturerId: string, manufacturer: string, preorder: boolean, basePrice: string, discountPrice: string, percent: string, startDateDiscount: string, endDateDiscount: string, title: string, titleOption: string, description: string, pictures: Array<string>, allOptions: Array<TitleValueVM<string, string>>) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.hasStock = hasStock;
        this.weight = weight;
        this.manufacturerId = manufacturerId;
        this.manufacturer = manufacturer;
        this.preorder = preorder;
        this.basePrice = basePrice;
        this.discountPrice = discountPrice;
        this.percent = percent;
        this.startDateDiscount = startDateDiscount;
        this.endDateDiscount = endDateDiscount;
        this.title = title;
        this.titleOption = titleOption;
        this.description = description;
        this.pictures = pictures;
        this.allOptions = allOptions;
    }
}