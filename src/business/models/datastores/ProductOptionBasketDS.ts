import TitleValueVM from "../viewmodels/TitleValueVM";

export default class ProductOptionBasketDS {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly hasStock: boolean;
    private readonly stock: number;
    private readonly weight: number;
    private readonly manufacturerId: string;
    private readonly manufacturer: string;
    private readonly preorder: boolean;
    private readonly basePrice: number;
    private readonly discountPrice: number;
    private readonly percent: number;
    private readonly startDateDiscount: Date;
    private readonly endDateDiscount: Date;
    private readonly title: string;
    private readonly titleOption: string;
    private readonly description: string;
    private readonly pictures: Array<string>;
    private readonly allOptions: Array<TitleValueVM<string, string>>;
    private readonly quantity: number;
    private readonly total: number;


    constructor(productOptionId: string, productId: string, hasStock: boolean, stock: number, weight: number, manufacturerId: string, manufacturer: string, preorder: boolean, basePrice: number, discountPrice: number, percent: number, startDateDiscount: Date, endDateDiscount: Date, title: string, titleOption: string, description: string, pictures: Array<string>, allOptions: Array<TitleValueVM<string, string>>, quantity: number, total: number) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.hasStock = hasStock;
        this.stock = stock;
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
        this.quantity = quantity;
        this.total = total;
    }


    getProductOptionId(): string {
        return this.productOptionId;
    }

    getProductId(): string {
        return this.productId;
    }

    getHasStock(): boolean {
        return this.hasStock;
    }

    getStock(): number {
        return this.stock;
    }

    getWeight(): number {
        return this.weight;
    }

    getManufacturerId(): string {
        return this.manufacturerId;
    }

    getManufacturer(): string {
        return this.manufacturer;
    }

    getPreorder(): boolean {
        return this.preorder;
    }

    getBasePrice(): number {
        return this.basePrice;
    }

    getDiscountPrice(): number {
        return this.discountPrice;
    }

    getPercent(): number {
        return this.percent;
    }

    getStartDateDiscount(): Date {
        return this.startDateDiscount;
    }

    getEndDateDiscount(): Date {
        return this.endDateDiscount;
    }

    getTitle(): string {
        return this.title;
    }

    getTitleOption(): string {
        return this.titleOption;
    }

    getDescription(): string {
        return this.description;
    }

    getPictures(): Array<string> {
        return this.pictures;
    }

    getAllOptions(): Array<TitleValueVM<string, string>> {
        return this.allOptions;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTotal(): number {
        return this.total;
    }
}