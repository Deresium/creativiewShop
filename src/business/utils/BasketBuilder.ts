import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import IProductOptionRequester from "../requesters/IProductOptionRequester";
import BasketVM from "../models/viewmodels/BasketVM";
import BasketDS from "../models/datastores/BasketDS";
import BasketOrderVM from "../models/viewmodels/BasketOrderVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionBasketVM from "../models/viewmodels/ProductOptionBasketVM";
import BasketProductOptionEntity from "../../database/entities/BasketProductOptionEntity";

export default class BasketBuilder {
    private readonly basketId: string;
    private readonly basketDataGateway: IBasketDataGateway;
    private readonly productOptionRequester: IProductOptionRequester;


    constructor(basketId: string, basketDataGateway: IBasketDataGateway, productOptionRequester: IProductOptionRequester) {
        this.basketId = basketId;
        this.basketDataGateway = basketDataGateway;
        this.productOptionRequester = productOptionRequester;
    }

    public async requestBasketWithPricesForUser(groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<BasketVM> {
        const basket = await this.basketDataGateway.findBasketById(this.basketId);
        let deliveryAddressCountryId = null;
        if (basket.getDeliveryAddress()) {
            deliveryAddressCountryId = basket.getDeliveryAddress().getCountryId();
        }
        const basketProductOptions = await this.basketDataGateway.getBasketProductOptions(this.basketId);
        const productOptionBaskets = new Array<ProductOptionBasketVM>();
        let totalBasket = 0;
        let totalWeightBasket = 0;
        for (const basketProductOption of basketProductOptions) {
            const productOptionStore = await this.productOptionRequester.getProductOptionStore(basketProductOption.getProductOptionId(), groupIds, customer, currency, language);
            let price = Number(productOptionStore.getBasePrice());
            if (productOptionStore.getDiscountPrice()) {
                price = Number(productOptionStore.getDiscountPrice());
            }

            const total = (price * basketProductOption.getQuantity());
            const totalWeight = (productOptionStore.getWeight() * basketProductOption.getQuantity());
            totalBasket += total;
            totalWeightBasket += totalWeight;
            const totalString = total.toFixed(2);
            const productOptionBasket = new ProductOptionBasketVM(
                productOptionStore.getProductOptionId(),
                productOptionStore.getProductId(),
                productOptionStore.getHasStock(),
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
                totalString
            );
            productOptionBaskets.push(productOptionBasket);
        }

        return new BasketVM(this.basketId, productOptionBaskets, totalBasket.toFixed(2), totalWeightBasket.toFixed(2), basket.getDeliveryAddressId(), basket.getBillingAddressId(), deliveryAddressCountryId, basket.getDeliveryOptionId());
    }

    public async requestBasketWithoutPrices(): Promise<BasketDS> {
        return null;
    }

    public async requestBasketOrder(): Promise<BasketOrderVM> {
        return null;
    }

    private getTotalWeightBasket(basketProductOptions: Array<BasketProductOptionEntity>): number {
        const totalWeight = 0;
        for (const basketProductOption of basketProductOptions) {
            //basketProductOption.getQuantity()
        }
        return totalWeight;
    }
}