import BasketEntity from "../../database/entities/BasketEntity";
import BasketDataMapper from "../../database/datamappers/BasketDataMapper";
import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import IProductOptionDataGateway from "../../database/gateways/IProductOptionDataGateway";
import BasketErrorReportVM from "../models/viewmodels/BasketErrorReportVM";
import BasketErrorVM from "../models/viewmodels/BasketErrorVM";
import BasketProductOptionEntity from "../../database/entities/BasketProductOptionEntity";

export default class BasketChecker {
    private readonly basketId: string;
    private readonly groupIds: Array<string>;
    private readonly basketDataMapper: IBasketDataGateway;
    private readonly productOptionDataGateway: IProductOptionDataGateway;


    constructor(basketId: string, groupIds: Array<string>, basketDataMapper: IBasketDataGateway, productOptionDataGateway: IProductOptionDataGateway) {
        this.basketId = basketId;
        this.groupIds = groupIds;
        this.basketDataMapper = basketDataMapper;
        this.productOptionDataGateway = productOptionDataGateway;
    }

    public async checkBasket(): Promise<BasketErrorReportVM> {
        const report = new BasketErrorReportVM();
        const productOptionBaskets = await this.basketDataMapper.getBasketProductOptions(this.basketId);
        for(const productOptionBasket of productOptionBaskets) {
            const error = await this.checkProductOption(productOptionBasket);
            if (error) {
                report.addErrorToProductOptionErrors(error);
            }
        }
        return report;
    }

    private async checkProductOption(productOptionBasket: BasketProductOptionEntity): Promise<BasketErrorVM> {
        const productOptionStore = await this.productOptionDataGateway.getProductOptionStore(productOptionBasket.getProductOptionId(), this.groupIds);
        if(productOptionStore.getStock() < productOptionBasket.getQuantity()){
            return new BasketErrorVM(productOptionStore.getProductOptionId(), "noStock");
        }
        return null;
    }
}