import ProductOptionBasketVM from "../viewmodels/ProductOptionBasketVM.ts";
import BasketVM from "../viewmodels/BasketVM.ts";
import TitleValueParser from "./TitleValueParser.ts";

export default class BasketParser {
    public static parseBasket(data: any): BasketVM {
        const productOptionStores = new Array<ProductOptionBasketVM>();
        for (const productOptionStore of data.productOptionStores) {
            productOptionStores.push(BasketParser.parseProductOptionBasket(productOptionStore));
        }
        return new BasketVM(data.basketId, productOptionStores, data.total, data.totalWeight, data.deliveryAddressId, data.billingAddressId);
    }

    private static parseProductOptionBasket(data: any): ProductOptionBasketVM {
        const allOptions = TitleValueParser.parseTitleValues<string, string>(data.allOptions);
        return new ProductOptionBasketVM(
            data.productOptionId,
            data.productId,
            data.hasStock,
            data.weight,
            data.manufacturerId,
            data.manufacturer,
            data.preorder,
            data.basePrice,
            data.discountPrice,
            data.percent,
            data.startDateDiscount,
            data.endDateDiscount,
            data.title,
            data.titleOption,
            data.description,
            data.pictures,
            allOptions,
            data.quantity,
            data.total
        )
    }
}