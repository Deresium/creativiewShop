import BasketOrderLightVM from "../viewmodels/BasketOrderLightVM.ts";
import BasketOrderVM from "../viewmodels/BasketOrderVM.ts";
import BasketProductOptionOrderVM from "../viewmodels/BasketProductOptionOrderVM.ts";

export default class BasketOrderParser {
    public static parseBasketOrderLights(data: any): Array<BasketOrderLightVM> {
        return data.map((basket: any) => BasketOrderParser.parseBasketOrderLight(basket));
    }

    public static parseBasketOrder(data: any): BasketOrderVM {
        const basketProductOptionOrders = new Array<BasketProductOptionOrderVM>();
        for (const basketProductOption of data.basketProductOptionOrders) {
            const basketProductOptionOrder = new BasketProductOptionOrderVM(
                basketProductOption.productOptionId,
                basketProductOption.productId,
                basketProductOption.price,
                basketProductOption.quantity,
                basketProductOption.pictures,
                basketProductOption.title,
                basketProductOption.total,
                basketProductOption.preorder
            );
            basketProductOptionOrders.push(basketProductOptionOrder);
        }

        let createdAt: Date = null;
        let orderedAt: Date = null;
        let paidAt: Date = null;
        let deliveredAt: Date = null;

        if (data.createdAt) {
            createdAt = new Date(data.createdAt);
        }

        if (data.orderedAt) {
            orderedAt = new Date(data.orderedAt);
        }

        if (data.paidAt) {
            paidAt = new Date(data.paidAt);
        }

        if (data.deliveredAt) {
            deliveredAt = new Date(data.deliveredAt);
        }

        return new BasketOrderVM(
            data.basketId,
            basketProductOptionOrders,
            data.totalWeight,
            data.deliveryPrice,
            data.productOptionsPrice,
            data.totalPrice,
            data.deliveryAddressId,
            data.billingAddressId,
            data.deliveryOptionLabel,
            data.paymentMethod,
            data.basketStateCode,
            data.currencyCode,
            data.currencySymbol,
            createdAt,
            orderedAt,
            paidAt,
            deliveredAt
        );
    }

    private static parseBasketOrderLight(data: any): BasketOrderLightVM {
        let createdAt: Date = null;
        let orderedAt: Date = null;
        let paidAt: Date = null;
        let deliveredAt: Date = null;

        if (data.createdAt) {
            createdAt = new Date(data.createdAt);
        }

        if (data.orderedAt) {
            orderedAt = new Date(data.orderedAt);
        }

        if (data.paidAt) {
            paidAt = new Date(data.paidAt);
        }

        if (data.deliveredAt) {
            deliveredAt = new Date(data.deliveredAt);
        }

        return new BasketOrderLightVM(
            data.basketId,
            data.firstName,
            data.name,
            data.email,
            createdAt,
            orderedAt,
            paidAt,
            deliveredAt,
            data.basketStateCode,
            data.orderNumber
        );
    }
}