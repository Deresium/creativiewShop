import IProductOptionPriceRequester from "../requesters/IProductOptionPriceRequester";
import ProductOptionPriceVM from "../models/viewmodels/ProductOptionPriceVM";
import IProductOptionPriceDataGateway from "../../database/gateways/IProductOptionPriceDataGateway";
import PercentCalculator from "../utils/PercentCalculator";

export default class ProductOptionPriceFacade implements IProductOptionPriceRequester {
    private readonly productOptionPriceDataGateway: IProductOptionPriceDataGateway;


    constructor(productOptionPriceDataGateway: IProductOptionPriceDataGateway) {
        this.productOptionPriceDataGateway = productOptionPriceDataGateway;
    }

    public async getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceVM>> {
        const pricesReturn = new Array<ProductOptionPriceVM>;
        const prices = await this.productOptionPriceDataGateway.getPricesForProductOption(productOptionId);
        for (const price of prices) {
            let startDate: string = null;
            let endDate: string = null;
            if (price.getStartDate()) {
                startDate = price.getStartDate().toISOString();
            }
            if (price.getEndDate()) {
                endDate = price.getEndDate().toISOString();
            }
            pricesReturn.push(new ProductOptionPriceVM(startDate, endDate, Number(price.getPrice()).toFixed(2)));
        }
        return pricesReturn;
    }

    public async updatePrice(productOptionId: string, price: number): Promise<void> {
        await this.productOptionPriceDataGateway.updatePrice(productOptionId, price);
    }

    public async getLastPriceForProductOption(productOptionId: string): Promise<string> {
        const price = await this.productOptionPriceDataGateway.getLastPriceForProductOption(productOptionId);
        if (price) {
            return Number(price.getPrice()).toFixed(2);
        }
        return null;
    }

    public async calculatePercentForProductOption(productOptionId: string, discountPrice: number): Promise<string> {
        const price = await this.productOptionPriceDataGateway.getLastPriceForProductOption(productOptionId);
        if (!price.getPrice() || !discountPrice) {
            return null;
        }
        const percent = PercentCalculator.calculatePercentBasedOnPrices(price.getPrice(), discountPrice);
        return percent.toFixed(2);
    }


}