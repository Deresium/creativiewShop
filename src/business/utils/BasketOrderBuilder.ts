import BasketOrderVM from "../models/viewmodels/BasketOrderVM";
import BasketEntity from "../../database/entities/BasketEntity";
import BasketProductOptionOrderVM from "../models/viewmodels/BasketProductOptionOrderVM";
import DeliveryOptionStoreDS from "../models/datastores/DeliveryOptionStoreDS";
import Decimal from "decimal.js";
import CurrencyVM from "../models/viewmodels/CurrencyVM";
import ProductOptionEntity from "../../database/entities/ProductOptionEntity";

export default class BasketOrderBuilder {
    private readonly basket: BasketEntity;
    private readonly deliveryOption: DeliveryOptionStoreDS;
    private readonly currencies: Array<CurrencyVM>;
    private readonly language: string;


    constructor(basket: BasketEntity, deliveryOption: DeliveryOptionStoreDS, currencies: Array<CurrencyVM>, language: string) {
        this.basket = basket;
        this.deliveryOption = deliveryOption;
        this.currencies = currencies;
        this.language = language;
    }

    public buildBasketOrder(): BasketOrderVM {
        const productOptionOrdersBasket = new Array<BasketProductOptionOrderVM>();

        let totalPriceProductOption: Decimal = new Decimal(0);
        let totalPrice: Decimal = new Decimal(0);

        for (const productOptionBasket of this.basket.getBasketProductOptions()) {
            let price: string = null;
            let totalPrice: string = null;
            if (productOptionBasket.getPriceAtOrdered()) {
                price = productOptionBasket.getPriceAtOrdered().toFixed(2);
                const totalPriceDecimal = productOptionBasket.getPriceAtOrdered().mul(productOptionBasket.getQuantity());
                totalPrice = totalPriceDecimal.toFixed(2);
                totalPriceProductOption = totalPriceProductOption.add(totalPriceDecimal);
            }

            const pictureIds = productOptionBasket.getProductOption().getListPictures().map(picture => picture.getProductOptionPictureId());

            const basketProductOptionOrderVM = new BasketProductOptionOrderVM(
                productOptionBasket.getProductOptionId(),
                productOptionBasket.getProductOption().getProductId(),
                price,
                productOptionBasket.getQuantity(),
                pictureIds,
                this.getTitle(productOptionBasket.getProductOption()),
                totalPrice
            );
            productOptionOrdersBasket.push(basketProductOptionOrderVM);
        }

        totalPrice = totalPrice.add(totalPriceProductOption);

        let createdAt: string = null;
        let orderedAt: string = null;
        let paidAt: string = null;
        let deliveredAt: string = null;
        if (this.basket.getCreatedAt()) {
            createdAt = this.basket.getCreatedAt().toISOString();
        }

        if (this.basket.getOrderedAt()) {
            orderedAt = this.basket.getOrderedAt().toISOString();
        }

        if (this.basket.getPaidAt()) {
            paidAt = this.basket.getPaidAt().toISOString();
        }

        if (this.basket.getDeliveredAt()) {
            deliveredAt = this.basket.getDeliveredAt().toISOString();
        }

        let currencySymbol: string = null;
        for (const currency of this.currencies) {
            if (currency.getCurrencyCode() === this.basket.getCurrencyAtOrdered()) {
                currencySymbol = currency.getSymbol();
            }
        }

        let totalWeight: string = null;
        let deliveryPrice: string = null;


        if (this.basket.getTotalWeightAtOrdered()) {
            totalWeight = this.basket.getTotalWeightAtOrdered().toFixed(2);
        }

        if (this.deliveryOption && this.deliveryOption.getPrice()) {
            totalPrice = totalPrice.add(this.deliveryOption.getPrice());
            deliveryPrice = this.deliveryOption.getPrice().toFixed(2);
        }


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
            this.basket.getCurrencyAtOrdered(),
            currencySymbol,
            this.basket.getUser().getFirstName(),
            this.basket.getUser().getName(),
            this.basket.getUser().getEmail(),
            this.basket.getOrderNumber(),
            createdAt,
            orderedAt,
            paidAt,
            deliveredAt
        )
    }

    private getTitle(productOption: ProductOptionEntity) {
        const productOptionNameFr = productOption.getNameFr();
        const productNameFr = productOption.getProduct().getNameFr();
        let completeNameFr: string = null;
        if (productOptionNameFr) {
            completeNameFr = `${productNameFr} (${productOptionNameFr})`;
        } else {
            completeNameFr = productNameFr;
        }

        switch (this.language) {
            case 'fr':
                return completeNameFr;
            case 'en':
                const productOptionNameEn = productOption.getNameEn();
                const productNameEn = productOption.getProduct().getNameEn();
                if (productOptionNameEn) {
                    return `${productNameEn} (${productOptionNameEn})`
                } else {
                    return productNameEn;
                }
            default:
                return completeNameFr;
        }
    }


}