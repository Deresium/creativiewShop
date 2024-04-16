import TitleValueVM from "../viewmodels/TitleValueVM";
import Decimal from "decimal.js";

export default class ProductOptionBasketDS {
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
    private readonly quantity: number;
    private readonly total: Decimal;


    constructor(productOptionId: string, productId: string, hasStock: boolean, stock: number, weight: Decimal, manufacturerId: string, manufacturer: string, preorder: boolean, basePrice: Decimal, discountPrice: Decimal, percent: Decimal, startDateDiscount: Date, endDateDiscount: Date, title: string, titleOption: string, description: string, pictures: Array<string>, allOptions: Array<TitleValueVM<string, string>>, quantity: number, total: Decimal) {
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

    getWeight(): Decimal {
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

    getBasePrice(): Decimal {
        return this.basePrice;
    }

    getDiscountPrice(): Decimal {
        return this.discountPrice;
    }

    getPercent(): Decimal {
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

    getTotal(): Decimal {
        return this.total;
    }
}