import IBasketRequester from "../requesters/IBasketRequester";
import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketVM from "../models/viewmodels/BasketVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import IProductOptionRequester from "../requesters/IProductOptionRequester";
import BasketErrorReportVM from "../models/viewmodels/BasketErrorReportVM";
import BasketChecker from "../utils/BasketChecker";
import ProductOptionDataMapper from "../../database/datamappers/ProductOptionDataMapper";
import IDeliveryOptionRequester from "../requesters/IDeliveryOptionRequester";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import ICurrencyRateRequester from "../requesters/ICurrencyRateRequester";
import BasketBuilder from "../utils/BasketBuilder";
import BasketToOrderDS from "../models/datastores/BasketToOrderDS";
import Decimal from "decimal.js";

export default class BasketFacade implements IBasketRequester {
    private readonly basketDataGateway: IBasketDataGateway;
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly productOptionDataMapper: ProductOptionDataMapper;
    private readonly deliveryOptionRequester: IDeliveryOptionRequester;
    private readonly currencyRateRequester: ICurrencyRateRequester;


    constructor(basketDataGateway: IBasketDataGateway, productOptionRequester: IProductOptionRequester, productOptionDataMapper: ProductOptionDataMapper, deliveryOptionRequester: IDeliveryOptionRequester, currencyRateRequester: ICurrencyRateRequester) {
        this.basketDataGateway = basketDataGateway;
        this.productOptionRequester = productOptionRequester;
        this.productOptionDataMapper = productOptionDataMapper;
        this.deliveryOptionRequester = deliveryOptionRequester;
        this.currencyRateRequester = currencyRateRequester;
    }

    public async addOpenBasketIfNotExists(userId: string): Promise<string> {
        const existsBasket = await this.basketDataGateway.findOpenBasketForUser(userId);
        if (existsBasket) {
            return existsBasket.getBasketId();
        }
        const newBasket = await this.basketDataGateway.addBasketForUser(userId);
        return newBasket.getBasketId();
    }

    public async addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        const existingProductOptionBasket = await this.basketDataGateway.findProductOptionBasket(basketProductOption.getBasketId(), basketProductOption.getProductOptionId());
        if (existingProductOptionBasket) {
            const quantity = existingProductOptionBasket.getQuantity() + basketProductOption.getQuantity();
            const updateBasketProductOption = new BasketProductOptionDS(basketProductOption.getBasketId(), basketProductOption.getProductOptionId(), quantity);
            await this.basketDataGateway.updateProductOptionBasket(updateBasketProductOption);
        } else {
            await this.basketDataGateway.addProductOptionToBasket(basketProductOption);
        }
    }

    public async deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void> {
        await this.basketDataGateway.deleteProductOptionBasket(basketId, productOptionId);
    }

    public async getBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<BasketVM> {
        return await new BasketBuilder(basketId, this.basketDataGateway, this.productOptionRequester, this.currencyRateRequester, this.deliveryOptionRequester).requestBasketVM(groupIds, customer, currency, language);
    }

    public async updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        if (!basketProductOption.getQuantity() || basketProductOption.getQuantity() <= 0) {
            throw new Error('error.basketQuantity');
        }
        await this.basketDataGateway.updateProductOptionBasket(basketProductOption);
    }

    public async checkBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, language: string): Promise<BasketErrorReportVM> {
        const basketChecker = new BasketChecker(basketId, groupIds, customer, language, this.basketDataGateway, this.productOptionDataMapper);
        return await basketChecker.checkBasket();
    }

    public async updateBasketBillingAddress(basketId: string, addressId: string): Promise<void> {
        await this.basketDataGateway.updateBasketBillingAddress(basketId, addressId);
    }

    public async updateBasketDeliveryAddress(basketId: string, addressId: string): Promise<void> {
        await this.basketDataGateway.updateBasketDeliveryAddress(basketId, addressId);
    }

    public async getBasketNbItems(basketId: string): Promise<number> {
        const basketProductOptions = await this.basketDataGateway.getBasketProductOptions(basketId);
        let nbItems = 0;
        for (const basketProductOption of basketProductOptions) {
            nbItems += basketProductOption.getQuantity();
        }
        return nbItems;
    }

    public async getDeliveryOptionsForBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<Array<DeliveryOptionStoreVM>> {
        const basket = await this.basketDataGateway.findBasketWithProductOptionWeight(basketId);
        if (!basket.getDeliveryAddress() || !basket.getDeliveryAddress().getCountryId()) {
            return null;
        }

        let totalWeight = new Decimal(0);
        for (const basketProductOption of basket.getBasketProductOptions()) {
            totalWeight = totalWeight.add(basketProductOption.getProductOption().getWeight().mul(basketProductOption.getQuantity()));
        }

        const rates = await this.currencyRateRequester.getCurrentCurrencyRateForCustomer(customer.getCustomerId());
        return await this.deliveryOptionRequester.getDeliveryOptionsForCountry(customer, basket.getDeliveryAddress().getCountryId(), totalWeight, currency, rates);
    }

    public async updateBasketDeliveryOption(basketId: string, deliveryOptionId: string): Promise<void> {
        await this.basketDataGateway.updateBasketDeliveryOption(basketId, deliveryOptionId);
    }

    public async updateBasketPaymentMethod(basketId: string, paymentMethod: string): Promise<void> {
        await this.basketDataGateway.updateBasketPaymentMethod(basketId, paymentMethod);
    }


    public async basketToOrder(customer: CustomerVM, basketId: string, groupIds: Array<string>, currency: string, language: string): Promise<void> {
        const basket = await new BasketBuilder(basketId, this.basketDataGateway, this.productOptionRequester, this.currencyRateRequester, this.deliveryOptionRequester).requestBasket(groupIds, customer, currency, language);

        const productOptionStock = new Map<string, number>();
        const productOptionPrices = new Map<string, Decimal>();
        for (const productOptionBasket of basket.getProductOptionStores()) {
            const remainingStock = productOptionBasket.getStock() - productOptionBasket.getQuantity();
            let price = productOptionBasket.getBasePrice();
            if (productOptionBasket.getDiscountPrice()) {
                price = productOptionBasket.getDiscountPrice();
            }
            productOptionStock.set(productOptionBasket.getProductOptionId(), remainingStock);
            productOptionPrices.set(productOptionBasket.getProductOptionId(), price);
        }

        const basketToOrderDS = new BasketToOrderDS(basketId, basket.getTotalWeight(), productOptionStock, productOptionPrices);
        await this.basketDataGateway.basketToOrder(basketToOrderDS);
    }
}