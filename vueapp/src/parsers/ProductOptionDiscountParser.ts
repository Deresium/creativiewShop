import ProductOptionDiscountVM from "../viewmodels/ProductOptionDiscountVM.ts";

export default class ProductOptionDiscountParser {
    public static parseProductOptionDiscounts(data: any): Array<ProductOptionDiscountVM> {
        return data.map((discount: any) => ProductOptionDiscountParser.parseProductOptionDiscount(discount));
    }

    public static parseProductOptionDiscount(data: any): ProductOptionDiscountVM {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        let deletedAt = null;
        if (data.deletedAt) {
            deletedAt = new Date(data.deletedAt);
        }
        return new ProductOptionDiscountVM(data.productOptionDiscountId, data.productOptionId, data.groupName, data.percent, data.lastPrice, data.discountPrice, startDate, endDate, deletedAt);
    }
}