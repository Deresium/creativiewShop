import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import IProductOptionDataGateway from "../../database/gateways/IProductOptionDataGateway";
import BasketErrorReportVM from "../models/viewmodels/BasketErrorReportVM";
import BasketErrorVM from "../models/viewmodels/BasketErrorVM";
import BasketProductOptionEntity from "../../database/entities/BasketProductOptionEntity";
import CustomerVM from "../models/viewmodels/CustomerVM";

export default class BasketChecker {
    private readonly basketId: string;
    private readonly groupIds: Array<string>;
    private readonly customer: CustomerVM;
    private readonly language: string;
    private readonly basketDataGateway: IBasketDataGateway;
    private readonly productOptionDataGateway: IProductOptionDataGateway;


    constructor(basketId: string, groupIds: Array<string>, customer: CustomerVM, language: string, basketDataMapper: IBasketDataGateway, productOptionDataGateway: IProductOptionDataGateway) {
        this.basketId = basketId;
        this.groupIds = groupIds;
        this.customer = customer;
        this.language = language;
        this.basketDataGateway = basketDataMapper;
        this.productOptionDataGateway = productOptionDataGateway;
    }

    public async checkBasket(): Promise<BasketErrorReportVM> {
        const report = new BasketErrorReportVM();

        if (!this.basketId) {
            report.addErrorToBasketErrors(new BasketErrorVM(null, null, "noBasket"));
            return report;
        }

        const basket = await this.basketDataGateway.findBasketById(this.basketId);

        if (basket.getBasketStateCode() !== 'BASKET') {
            report.addErrorToBasketErrors(new BasketErrorVM(this.basketId, null, "basketNotOpen"));
            return report;
        }

        const productOptionBaskets = await this.basketDataGateway.getBasketProductOptions(this.basketId);
        for (const productOptionBasket of productOptionBaskets) {
            const error = await this.checkProductOption(productOptionBasket);
            if (error) {
                report.addErrorToProductOptionErrors(error);
            }
        }
        return report;
    }

    private async checkProductOption(productOptionBasket: BasketProductOptionEntity): Promise<BasketErrorVM> {
        const productOptionStore = await this.productOptionDataGateway.getProductOptionStore(productOptionBasket.getProductOptionId(), this.groupIds);
        const label = this.getLabel(productOptionStore.getProduct().getNameFr(), productOptionStore.getProduct().getNameEn());

        if (productOptionStore.getStock() < productOptionBasket.getQuantity()) {
            return new BasketErrorVM(productOptionStore.getProductOptionId(), label, "basket.error.noStock");
        }
        if (productOptionStore.getProduct().getCustomerId() !== this.customer.getCustomerId()) {
            return new BasketErrorVM(productOptionStore.getProductOptionId(), label, "basket.error.notSameCustomer");
        }
        if (productOptionStore.getDeletedAt() !== null || productOptionStore.getProduct().getDeletedAt() !== null) {
            return new BasketErrorVM(productOptionStore.getProductOptionId(), label, "basket.error.deletedProduct");
        }
        if (!productOptionStore.getActive()) {
            return new BasketErrorVM(productOptionStore.getProductOptionId(), label, "basket.error.deletedProduct");
        }
        if (productOptionStore.getListPrices().length === 0) {
            return new BasketErrorVM(productOptionStore.getProductOptionId(), label, "basket.error.noPrice");
        }
        return null;
    }

    private getLabel(labelFR: string, labelEN: string) {
        switch (this.language) {
            case 'fr':
                return labelFR;
            case 'en':
                return labelEN;
            default:
                return labelFR;
        }
    }
}