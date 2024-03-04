export default class ProductOptionDiscountVM {
    private readonly productOptionDiscountId: string;
    private readonly productOptionId: string;
    private readonly groupId: string;
    private readonly percent: number;
    private readonly startDate: string;
    private readonly endDate: string;
    private readonly deletedAt: string;


    constructor(productOptionDiscountId: string, productOptionId: string, groupId: string, percent: number, startDate: string, endDate: string, deletedAt: string) {
        this.productOptionDiscountId = productOptionDiscountId;
        this.productOptionId = productOptionId;
        this.groupId = groupId;
        this.percent = percent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.deletedAt = deletedAt;
    }
}