import DeliveryOptionEntity from "../../database/entities/DeliveryOptionEntity";
import CustomerVM from "../models/viewmodels/CustomerVM";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import PriceCurrencyCalculator from "./PriceCurrencyCalculator";
import Decimal from "decimal.js";

export default class DeliveryOptionStoreBuilder {
    private readonly deliveryOption: DeliveryOptionEntity;
    private readonly customer: CustomerVM;
    private readonly currencyRates: Map<string, Decimal>;
    private readonly weight: Decimal;
    private readonly currency: string;


    constructor(deliveryOption: DeliveryOptionEntity, customer: CustomerVM, currencyRates: Map<string, Decimal>, weight: Decimal, currency: string) {
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
        let basePrice = new Decimal(0);
        const weightPrices = this.deliveryOption.getWeightPrices().sort();
        for (const weightPrice of weightPrices) {
            if (this.weight.greaterThanOrEqualTo(weightPrice.getGram())) {
                basePrice = weightPrice.getPrice();
            }
        }
        return basePrice;
    }
}