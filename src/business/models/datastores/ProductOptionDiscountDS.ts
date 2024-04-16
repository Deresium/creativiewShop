export default class ProductOptionDiscountDS {
    private readonly productOptionId: string;
    private readonly groupId: string;
    private readonly percent: string;
    private readonly startDate: Date;
    private readonly endDate: Date;


    constructor(productOptionId: string, groupId: string, percent: string, startDate: Date, endDate: Date) {
        this.productOptionId = productOptionId;
        this.groupId = groupId;
        this.percent = percent;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getProductOptionId(): string {
        return this.productOptionId;
    }

    getGroupId(): string {
        return this.groupId;
    }

    getPercent(): string {
        return this.percent;
    }


    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }
}