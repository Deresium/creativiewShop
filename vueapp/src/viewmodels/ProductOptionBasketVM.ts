import TitleValueVM from "./TitleValueVM.ts";


export default class ProductOptionBasketVM {
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
    private readonly quantity: number;
    private readonly total: string;


    constructor(productOptionId: string, productId: string, hasStock: boolean, weight: number, manufacturerId: string, manufacturer: string, preorder: boolean, basePrice: string, discountPrice: string, percent: string, startDateDiscount: string, endDateDiscount: string, title: string, titleOption: string, description: string, pictures: Array<string>, allOptions: Array<TitleValueVM<string, string>>, quantity: number, total: string) {
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
        this.quantity = quantity;
        this.total = total;
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

    public getWeight(): number {
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

    public getBasePrice(): string {
        return this.basePrice;
    }

    public getDiscountPrice(): string {
        return this.discountPrice;
    }

    public getPrice() {
        if (this.discountPrice) {
            return this.discountPrice;
        }
        return this.basePrice;
    }

    public getPercent(): string {
        return this.percent;
    }

    public getStartDateDiscount(): string {
        return this.startDateDiscount;
    }

    public getEndDateDiscount(): string {
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

    public getPictureId() {
        if (this.pictures && this.pictures.length >= 1) {
            return this.pictures[0];
        }
        return null;
    }

    public hasMultipleOptions() {
        return this.allOptions && this.allOptions.length > 1;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getTotal(): string {
        return this.total;
    }
}