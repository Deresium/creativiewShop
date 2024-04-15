import DeliveryOptionEntity from "../../database/entities/DeliveryOptionEntity";
import CustomerVM from "../models/viewmodels/CustomerVM";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import ICurrencyRateDataGateway from "../../database/gateways/ICurrencyRateDataGateway";
import PriceCurrencyCalculator from "./PriceCurrencyCalculator";

export default class DeliveryOptionStoreBuilder {
    private readonly deliveryOption: DeliveryOptionEntity;
    private readonly customer: CustomerVM;
    private readonly currencyDataGateway: ICurrencyRateDataGateway;
    private readonly weight: number;
    private readonly currency: string;
    private readonly language: string;


    constructor(deliveryOption: DeliveryOptionEntity, customer: CustomerVM, currencyDataGateway: ICurrencyRateDataGateway, weight: number, currency: string, language: string) {
        this.deliveryOption = deliveryOption;
        this.customer = customer;
        this.currencyDataGateway = currencyDataGateway;
        this.weight = weight;
        this.currency = currency;
        this.language = language;
    }

    public async buildDeliveryOptionStore(): Promise<DeliveryOptionStoreVM> {
        const price = await new PriceCurrencyCalculator(this.getBasePrice(), this.currency, this.customer, this.currencyDataGateway).getPrice();
        return new DeliveryOptionStoreVM(this.deliveryOption.getDeliveryOptionId(), price.toFixed(2), this.deliveryOption.getNameFr());
    }

    private getBasePrice() {
        let basePrice = 0;
        for (const weightPrice of this.deliveryOption.getWeightPrices()) {
            if (this.weight >= weightPrice.getGram()) {
                basePrice = weightPrice.getPrice();
            }
        }
        return basePrice;
    }
}