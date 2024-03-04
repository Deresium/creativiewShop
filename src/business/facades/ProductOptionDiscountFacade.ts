import IProductOptionDiscountRequester from "../requesters/IProductOptionDiscountRequester";
import ProductOptionDiscountDS from "../models/datastores/ProductOptionDiscountDS";
import ProductOptionDiscountVM from "../models/viewmodels/ProductOptionDiscountVM";
import IProductOptionDiscountDataGateway from "../../database/gateways/IProductOptionDiscountDataGateway";
import ProductOptionDiscountEntity from "../../database/entities/ProductOptionDiscountEntity";

export default class ProductOptionDiscountFacade implements IProductOptionDiscountRequester {
    private readonly productOptionDiscountDataGateway: IProductOptionDiscountDataGateway;

    constructor(productOptionDiscountDataGateway: IProductOptionDiscountDataGateway) {
        this.productOptionDiscountDataGateway = productOptionDiscountDataGateway;
    }

    public async addProductOptionDiscount(productOptionDiscountDs: ProductOptionDiscountDS): Promise<void> {
        const now = new Date();
        if(!productOptionDiscountDs.getStartDate() || !productOptionDiscountDs.getEndDate()){
            return;
        }

        if(productOptionDiscountDs.getStartDate() < now
            || productOptionDiscountDs.getEndDate() < now
            || productOptionDiscountDs.getEndDate() <= productOptionDiscountDs.getStartDate()){
            throw new Error('error.date');
        }

        await this.productOptionDiscountDataGateway.addProductOptionDiscount(productOptionDiscountDs);

    }

    public async deleteProductOptionDiscount(productOptionDiscountId: string): Promise<void> {
        await this.productOptionDiscountDataGateway.deleteProductOptionDiscount(productOptionDiscountId);
    }

    public async getDiscountsForProductOption(productOptionId: string): Promise<Array<ProductOptionDiscountVM>> {
        const discountsReturn = new Array<ProductOptionDiscountVM>();
        const productDiscounts = await this.productOptionDiscountDataGateway.getDiscountsForProductOption(productOptionId);
        for(const productDiscount of productDiscounts){
            const startDate = productDiscount.getStartDate().toISOString();
            const endDate = productDiscount.getEndDate().toISOString();
            let deletedAtDate = null;
            if(productDiscount.getDeletedAt()){
                deletedAtDate = productDiscount.getDeletedAt().toISOString();
            }
            discountsReturn.push(new ProductOptionDiscountVM(productDiscount.getProductOptionDiscountId(), productDiscount.getProductOptionId(), productDiscount.getGroupId(), productDiscount.getPercent(), startDate, endDate, deletedAtDate));
        }
        return discountsReturn;
    }
}