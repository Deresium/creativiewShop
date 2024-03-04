import IProductOptionPriceRequester from "../requesters/IProductOptionPriceRequester";
import ProductOptionPriceVM from "../models/viewmodels/ProductOptionPriceVM";
import IProductOptionPriceDataGateway from "../../database/gateways/IProductOptionPriceDataGateway";

export default class ProductOptionPriceFacade implements IProductOptionPriceRequester {
    private readonly productOptionPriceDataGateway: IProductOptionPriceDataGateway;


    constructor(productOptionPriceDataGateway: IProductOptionPriceDataGateway) {
        this.productOptionPriceDataGateway = productOptionPriceDataGateway;
    }

    public async getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceVM>> {
        const pricesReturn = new Array<ProductOptionPriceVM>;
        const prices = await this.productOptionPriceDataGateway.getPricesForProductOption(productOptionId);
        for(const price of prices){
            let startDate: string = null;
            let endDate: string = null;
            if(price.getStartDate()){
                startDate = price.getStartDate().toISOString();
            }
            if(price.getEndDate()){
                endDate = price.getEndDate().toISOString();
            }
            pricesReturn.push(new ProductOptionPriceVM(startDate, endDate, price.getPrice()));
        }
        return pricesReturn;
    }

    public async updatePrice(productOptionId: string, price: number): Promise<void> {
        return Promise.resolve(undefined);
    }

}