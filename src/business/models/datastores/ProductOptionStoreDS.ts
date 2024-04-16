import TitleValueVM from "../viewmodels/TitleValueVM";
import Decimal from "decimal.js";

export default class ProductOptionStoreDS {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly hasStock: boolean;
    private readonly stock: number;
    private readonly weight: Decimal;
    private readonly manufacturerId: string;
    private readonly manufacturer: string;
    private readonly preorder: boolean;
    private readonly basePrice: Decimal;
    private readonly discountPrice: Decimal;
    private readonly percent: Decimal;
    private readonly startDateDiscount: Date;
    private readonly endDateDiscount: Date;
    private readonly title: string;
    private readonly titleOption: string;
    private readonly description: string;
    private readonly pictures: Array<string>;
    private readonly allOptions: Array<TitleValueVM<string, string>>;


    constructor(productOptionId: string, productId: string, hasStock: boolean, stock: number, weight: Decimal, manufacturerId: string, manufacturer: string, preorder: boolean, basePrice: Decimal, discountPrice: Decimal, percent: Decimal, startDateDiscount: Date, endDateDiscount: Date, title: string, titleOption: string, description: string, pictures: Array<string>, allOptions: Array<TitleValueVM<string, string>>) {
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
    }

    public getProductOptionId(): string {
        return this.productOptionId;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getHasStock(): boolean {
        return this.hasStock;
    }

    public getWeight(): Decimal {
        return this.weight;
    }

    public getManufacturerId(): string {
        return this.manufacturerId;
    }

    public getManufacturer(): string {
        return this.manufacturer;
    }

    public getPreorder(): boolean {
        return this.preorder;
    }

    public getBasePrice(): Decimal {
        return this.basePrice;
    }

    public getDiscountPrice(): Decimal {
        return this.discountPrice;
    }

    public getPercent(): Decimal {
        return this.percent;
    }

    public getStartDateDiscount(): Date {
        return this.startDateDiscount;
    }

    public getEndDateDiscount(): Date {
        return this.endDateDiscount;
    }

    public getTitle(): string {
        return this.title;
    }

    public getTitleOption(): string {
        return this.titleOption;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPictures(): Array<string> {
        return this.pictures;
    }

    public getAllOptions(): Array<TitleValueVM<string, string>> {
        return this.allOptions;
    }


    getStock(): number {
        return this.stock;
    }
}