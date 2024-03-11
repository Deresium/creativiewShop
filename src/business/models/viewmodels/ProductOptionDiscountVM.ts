export default class ProductOptionDiscountVM {
    private readonly productOptionDiscountId: string;
    private readonly productOptionId: string;
    private readonly groupName: string;
    private readonly percent: string;
    private readonly lastPrice: string;
    private readonly discountPrice: string;
    private readonly startDate: string;
    private readonly endDate: string;
    private readonly deletedAt: string;


    constructor(productOptionDiscountId: string, productOptionId: string, groupName: string, percent: string, lastPrice: string, discountPrice: string, startDate: string, endDate: string, deletedAt: string) {
        this.productOptionDiscountId = productOptionDiscountId;
        this.productOptionId = productOptionId;
        this.groupName = groupName
        this.percent = percent;
        this.lastPrice = lastPrice;
        this.discountPrice = discountPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.deletedAt = deletedAt;
    }
}