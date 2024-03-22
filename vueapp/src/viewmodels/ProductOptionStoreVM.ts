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
    private readonly otherOptions: Array<string>;


    constructor(productOptionId: string, productId: string, hasStock: boolean, weight: number, manufacturer: string, preorder: boolean, basePrice: number, discountPrice: number, percent: number, startDateDiscount: Date, endDateDiscount: Date, title: string, description: string, pictures: Array<string>, otherOptions: Array<string>) {
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

    public getManufacturer(): string {
        return this.manufacturer;
    }

    public getPreorder(): boolean {
        return this.preorder;
    }

    public getBasePrice(): number {
        return this.basePrice;
    }

    public getDiscountPrice(): number {
        return this.discountPrice;
    }

    public getPercent(): number {
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

    public getDescription(): string {
        return this.description;
    }

    public getPictures(): Array<string> {
        return this.pictures;
    }

    public getOtherOptions(): Array<string> {
        return this.otherOptions;
    }
}