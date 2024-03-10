export default class ProductOptionDiscountVM {
    private readonly productOptionDiscountId: string;
    private readonly productOptionId: string;
    private readonly groupId: string;
    private readonly percent: string;
    private readonly startDate: Date;
    private readonly endDate: Date;
    private readonly deletedAt: Date;


    constructor(productOptionDiscountId: string, productOptionId: string, groupId: string, percent: string, startDate: Date, endDate: Date, deletedAt: Date) {
        this.productOptionDiscountId = productOptionDiscountId;
        this.productOptionId = productOptionId;
        this.groupId = groupId;
        this.percent = percent;
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

    public getGroupId(): string {
        return this.groupId;
    }

    public getPercent(): string {
        return this.percent;
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