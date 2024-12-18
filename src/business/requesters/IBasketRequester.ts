import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketVM from "../models/viewmodels/BasketVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import BasketErrorReportVM from "../models/viewmodels/BasketErrorReportVM";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import BasketOrderVM from "../models/viewmodels/BasketOrderVM";
import BasketOrderLightVM from "../models/viewmodels/BasketOrderLightVM";

export default interface IBasketRequester {
    getBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<BasketVM>;

    addOpenBasketIfNotExists(userId: string): Promise<string>;

    addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void>;

    updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void>;

    deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void>;

    updateBasketDeliveryAddress(basketId: string, addressId: string): Promise<void>;

    updateBasketBillingAddress(basketId: string, addressId: string): Promise<void>;

    updateBasketDeliveryOption(basketId: string, deliveryOptionId: string): Promise<void>;

    updateBasketPaymentMethod(basketId: string, paymentMethod: string): Promise<void>;

    checkBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, language: string): Promise<BasketErrorReportVM>;

    getBasketNbItems(basketId: string): Promise<number>;

    getDeliveryOptionsForBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<Array<DeliveryOptionStoreVM>>;

    basketToOrder(customer: CustomerVM, basketId: string, groupIds: Array<string>, currency: string, language: string): Promise<void>;

    getBasketOrder(basketId: string, customer: CustomerVM, language: string): Promise<BasketOrderVM>;

    isBasketOwnerUser(basketId: string, userId: string): Promise<boolean>;

    isBasketOwnerCustomer(basketId: string, customerId: string): Promise<boolean>;

    getOrdersForUser(userId: string): Promise<Array<BasketOrderLightVM>>;

    getOrdersForCustomer(customerId: number): Promise<Array<BasketOrderLightVM>>;

    orderToPaid(basketId: string): Promise<void>;

    paidToDelivered(basketId: string): Promise<void>;

}