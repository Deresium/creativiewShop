import BasketOrderVM from "../models/viewmodels/BasketOrderVM";
import BasketEntity from "../../database/entities/BasketEntity";
import BasketProductOptionOrderVM from "../models/viewmodels/BasketProductOptionOrderVM";
import DeliveryOptionStoreDS from "../models/datastores/DeliveryOptionStoreDS";
import Decimal from "decimal.js";

export default class BasketOrderBuilder {
    private readonly basket: BasketEntity;
    private readonly deliveryOption: DeliveryOptionStoreDS;


    constructor(basket: BasketEntity, deliveryOption: DeliveryOptionStoreDS) {
        this.basket = basket;
        this.deliveryOption = deliveryOption;
    }

    public buildBasketOrder(): BasketOrderVM {
        const productOptionOrdersBasket = new Array<BasketProductOptionOrderVM>();

        let totalWeight: string = null;
        let deliveryPrice: string = null;
        let totalPriceProductOption: Decimal = new Decimal(0);
        let totalPrice: Decimal = new Decimal(0);

        if(this.basket.getTotalWeightAtOrdered()){
            totalWeight = this.basket.getTotalWeightAtOrdered().toFixed(2);
        }

        if(this.deliveryOption && this.deliveryOption.getPrice()){
            totalPrice = totalPrice.add(this.deliveryOption.getPrice());
            deliveryPrice = this.deliveryOption.getPrice().toFixed(2);
        }

        for(const basketProductOption of this.basket.getBasketProductOptions()){
            if(basketProductOption.getPriceAtOrdered()){
                totalPriceProductOption = totalPriceProductOption.add(basketProductOption.getPriceAtOrdered());
            }
        }
        totalPrice = totalPrice.add(totalPriceProductOption);

        return new BasketOrderVM(
            this.basket.getBasketId(),
            productOptionOrdersBasket,
            totalWeight,
            deliveryPrice,
            totalPriceProductOption.toFixed(2),
            totalPrice.toFixed(2),
            this.basket.getDeliveryAddressId(),
            this.basket.getBillingAddressId(),
            this.deliveryOption.getName(),
            this.basket.getPaymentMethodCode(),
            this.basket.getBasketStateCode(),
            this.basket.getCurrencyAtOrdered()
        )
    }
}