import DeliveryOptionEntity from "../../database/entities/DeliveryOptionEntity";
import CustomerVM from "../models/viewmodels/CustomerVM";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import PriceCurrencyCalculator from "./PriceCurrencyCalculator";

export default class DeliveryOptionStoreBuilder {
    private readonly deliveryOption: DeliveryOptionEntity;
    private readonly customer: CustomerVM;
    private readonly currencyRates: Map<string, number>;
    private readonly weight: number;
    private readonly currency: string;


    constructor(deliveryOption: DeliveryOptionEntity, customer: CustomerVM, currencyRates: Map<string, number>, weight: number, currency: string) {
        this.deliveryOption = deliveryOption;
        this.customer = customer;
        this.currencyRates = currencyRates;
        this.weight = weight;
        this.currency = currency;
    }

    public buildDeliveryOptionStore(): DeliveryOptionStoreVM {
        const price = new PriceCurrencyCalculator(this.getBasePrice(), this.currency, this.customer, this.currencyRates).getPrice();
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