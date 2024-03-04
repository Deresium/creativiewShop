export default class ProductOptionDiscountDS {
    private readonly productOptionId: string;
    private readonly groupId: string;
    private readonly percent: number;
    private readonly startDate: Date;
    private readonly endDate: Date;


    constructor(productOptionId: string, groupId: string, percent: number) {
        this.productOptionId = productOptionId;
        this.groupId = groupId;
        this.percent = percent;
    }


    getProductOptionId(): string {
        return this.productOptionId;
    }

    getGroupId(): string {
        return this.groupId;
    }

    getPercent(): number {
        return this.percent;
    }


    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }
}