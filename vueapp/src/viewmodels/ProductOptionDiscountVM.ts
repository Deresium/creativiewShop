export default class ProductOptionDiscountVM {
    private readonly productOptionDiscountId: string;
    private readonly productOptionId: string;
    private readonly groupName: string;
    private readonly percent: string;
    private readonly lastPrice: string;
    private readonly discountPrice: string;
    private readonly startDate: Date;
    private readonly endDate: Date;
    private readonly deletedAt: Date;


    constructor(productOptionDiscountId: string, productOptionId: string, groupName: string, percent: string, lastPrice: string, discountPrice: string, startDate: Date, endDate: Date, deletedAt: Date) {
        this.productOptionDiscountId = productOptionDiscountId;
        this.productOptionId = productOptionId;
        this.groupName = groupName;
        this.percent = percent;
        this.lastPrice = lastPrice;
        this.discountPrice = discountPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.deletedAt = deletedAt;
    }


    public getProductOptionDiscountId(): string {
        return this.productOptionDiscountId;
    }

    public getProductOptionId(): string {
        return this.productOptionId;
    }

    public getGroupName(): string {
        return this.groupName;
    }

    public getPercent(): string {
        return this.percent;
    }

    public getLastPrice(): string {
        return this.lastPrice;
    }

    public getDiscountPrice(): string {
        return this.discountPrice;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getDeletedAt(): Date {
        return this.deletedAt;
    }
}