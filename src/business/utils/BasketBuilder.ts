import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import IProductOptionRequester from "../requesters/IProductOptionRequester";
import BasketVM from "../models/viewmodels/BasketVM";
import BasketOrderVM from "../models/viewmodels/BasketOrderVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionBasketVM from "../models/viewmodels/ProductOptionBasketVM";
import ICurrencyRateRequester from "../requesters/ICurrencyRateRequester";
import BasketDS from "../models/datastores/BasketDS";
import ProductOptionBasketDS from "../models/datastores/ProductOptionBasketDS";
import Decimal from "decimal.js";
import IDeliveryOptionRequester from "../requesters/IDeliveryOptionRequester";

export default class BasketBuilder {
    private readonly basketId: string;
    private readonly basketDataGateway: IBasketDataGateway;
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly currencyRateRequester: ICurrencyRateRequester;
    private readonly deliveryOptionRequester: IDeliveryOptionRequester;


    constructor(basketId: string, basketDataGateway: IBasketDataGateway, productOptionRequester: IProductOptionRequester, currencyRateRequester: ICurrencyRateRequester, deliveryOptionRequester: IDeliveryOptionRequester) {
        this.basketId = basketId;
        this.basketDataGateway = basketDataGateway;
        this.productOptionRequester = productOptionRequester;
        this.currencyRateRequester = currencyRateRequester;
        this.deliveryOptionRequester = deliveryOptionRequester;
    }

    public async requestBasket(groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<BasketDS> {
        const basket = await this.basketDataGateway.findBasketById(this.basketId);
        let deliveryAddressCountryId = null;
        if (basket.getDeliveryAddress()) {
            deliveryAddressCountryId = basket.getDeliveryAddress().getCountryId();
        }
        const productOptionBaskets = new Array<ProductOptionBasketDS>();
        let totalBasket = new Decimal(0);
        let totalWeightBasket = new Decimal(0);
        const currencyRates = await this.currencyRateRequester.getCurrentCurrencyRateForCustomer(customer.getCustomerId());


        const basketProductOptions = await this.basketDataGateway.getBasketProductOptions(this.basketId);
        for (const basketProductOption of basketProductOptions) {
            const productOptionStore = await this.productOptionRequester.getProductOptionStore(basketProductOption.getProductOptionId(), groupIds, customer, currency, language, currencyRates);
            let price = productOptionStore.getBasePrice();
            if (productOptionStore.getDiscountPrice()) {
                price = productOptionStore.getDiscountPrice();
            }

            const total = (price.mul(basketProductOption.getQuantity()));
            const totalWeight = (productOptionStore.getWeight().mul(basketProductOption.getQuantity()));
            totalBasket = totalBasket.add(total);
            totalWeightBasket = totalWeightBasket.add(totalWeight);
            const productOptionBasket = new ProductOptionBasketDS(
                productOptionStore.getProductOptionId(),
                productOptionStore.getProductId(),
                productOptionStore.getHasStock(),
                productOptionStore.getStock(),
                productOptionStore.getWeight(),
                productOptionStore.getManufacturerId(),
                productOptionStore.getManufacturer(),
                productOptionStore.getPreorder(),
                productOptionStore.getBasePrice(),
                productOptionStore.getDiscountPrice(),
                productOptionStore.getPercent(),
                productOptionStore.getStartDateDiscount(),
                productOptionStore.getEndDateDiscount(),
                productOptionStore.getTitle(),
                productOptionStore.getTitleOption(),
                productOptionStore.getDescription(),
                productOptionStore.getPictures(),
                productOptionStore.getAllOptions(),
                basketProductOption.getQuantity(),
                total
            );
            productOptionBaskets.push(productOptionBasket);
        }

        if (basket.getDeliveryOptionId()) {
            const deliveryOption = await this.deliveryOptionRequester.getDeliveryOptionById(customer, basket.getDeliveryOptionId(), totalWeightBasket, currency, currencyRates);
            totalBasket = totalBasket.add(deliveryOption.getPrice());
        }


        return new BasketDS(this.basketId, productOptionBaskets, totalBasket, totalWeightBasket, basket.getDeliveryAddressId(), basket.getBillingAddressId(), deliveryAddressCountryId, basket.getDeliveryOptionId(), basket.getPaymentMethodCode());
    }

    public async requestBasketVM(groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<BasketVM> {
        const basket = await this.requestBasket(groupIds, customer, currency, language);
        const basketProductOptions = new Array<ProductOptionBasketVM>();
        for (const basketProductOption of basket.getProductOptionStores()) {
            let startDateDiscount: string;
            let endDateDiscount: string;
            let discountPrice: string;
            let percent: string;
            if (basketProductOption.getDiscountPrice()) {
                startDateDiscount = basketProductOption.getStartDateDiscount().toISOString();
                endDateDiscount = basketProductOption.getEndDateDiscount().toISOString();
                discountPrice = basketProductOption.getDiscountPrice().toFixed(2);
                percent = basketProductOption.getPercent().toFixed(2);
            }
            const basketProductOptionVM = new ProductOptionBasketVM(
                basketProductOption.getProductOptionId(),
                basketProductOption.getProductId(),
                basketProductOption.getHasStock(),
                basketProductOption.getWeight().toFixed(2),
                basketProductOption.getManufacturerId(),
                basketProductOption.getManufacturer(),
                basketProductOption.getPreorder(),
                basketProductOption.getBasePrice().toFixed(2),
                discountPrice,
                percent,
                startDateDiscount,
                endDateDiscount,
                basketProductOption.getTitle(),
                basketProductOption.getTitleOption(),
                basketProductOption.getDescription(),
                basketProductOption.getPictures(),
                basketProductOption.getAllOptions(),
                basketProductOption.getQuantity(),
                basketProductOption.getTotal().toFixed(2)
            );
            basketProductOptions.push(basketProductOptionVM);
        }
        return new BasketVM(
            basket.getBasketId(),
            basketProductOptions,
            basket.getTotal().toFixed(2),
            basket.getTotalWeight().toFixed(2),
            basket.getDeliveryAddressId(),
            basket.getBillingAddressId(),
            basket.getDeliveryAddressCountryId(),
            basket.getDeliveryOptionId(),
            basket.getPaymentMethod()
        )
    }

    public async requestBasketOrder(): Promise<BasketOrderVM> {
        return null;
    }
}