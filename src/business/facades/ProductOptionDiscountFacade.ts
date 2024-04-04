import IProductOptionDiscountRequester from "../requesters/IProductOptionDiscountRequester";
import ProductOptionDiscountDS from "../models/datastores/ProductOptionDiscountDS";
import ProductOptionDiscountVM from "../models/viewmodels/ProductOptionDiscountVM";
import IProductOptionDiscountDataGateway from "../../database/gateways/IProductOptionDiscountDataGateway";
import PercentCalculator from "../utils/PercentCalculator";

export default class ProductOptionDiscountFacade implements IProductOptionDiscountRequester {
    private readonly productOptionDiscountDataGateway: IProductOptionDiscountDataGateway;

    constructor(productOptionDiscountDataGateway: IProductOptionDiscountDataGateway) {
        this.productOptionDiscountDataGateway = productOptionDiscountDataGateway;
    }

    public async addProductOptionDiscount(productOptionDiscountDs: ProductOptionDiscountDS): Promise<void> {
        const now = new Date();
        if (!productOptionDiscountDs.getStartDate() || !productOptionDiscountDs.getEndDate()) {
            return;
        }

        if (productOptionDiscountDs.getStartDate() < now
            || productOptionDiscountDs.getEndDate() < now) {
            throw new Error('error.date.past');
        }
        if (productOptionDiscountDs.getEndDate() <= productOptionDiscountDs.getStartDate()) {
            throw new Error('error.date.startAfter');
        }

        await this.productOptionDiscountDataGateway.addProductOptionDiscount(productOptionDiscountDs);

    }

    public async deleteProductOptionDiscount(productOptionDiscountId: string): Promise<void> {
        await this.productOptionDiscountDataGateway.deleteProductOptionDiscount(productOptionDiscountId);
    }

    public async getDiscountsForProductOption(productOptionId: string): Promise<Array<ProductOptionDiscountVM>> {
        const discountsReturn = new Array<ProductOptionDiscountVM>();
        const productDiscounts = await this.productOptionDiscountDataGateway.getDiscountsForProductOption(productOptionId);
        for (const productDiscount of productDiscounts) {
            const startDate = productDiscount.getStartDate().toISOString();
            const endDate = productDiscount.getEndDate().toISOString();
            let deletedAtDate = null;
            if (productDiscount.getDeletedAt()) {
                deletedAtDate = productDiscount.getDeletedAt().toISOString();
            }
            const percent = Number(productDiscount.getPercent());
            const lastPrice = Number(productDiscount.getProductOption().getListPrices()[0].getPrice());
            const discountPrice = PercentCalculator.calculateDiscountPriceBasedOnPercent(lastPrice, percent);
            let groupName = null;
            if (productDiscount.getGroup()) {
                groupName = productDiscount.getGroup().getName();
            }
            discountsReturn.push(new ProductOptionDiscountVM(productDiscount.getProductOptionDiscountId(), productDiscount.getProductOptionId(), groupName, `${percent.toFixed(2)}%`, lastPrice.toFixed(2), discountPrice.toFixed(2), startDate, endDate, deletedAtDate));
        }
        return discountsReturn;
    }

    public calculateDiscountPercent(originalPrice: number, discountPrice: number): number {
        return PercentCalculator.calculatePercentBasedOnPrices(originalPrice, discountPrice);
    }
}