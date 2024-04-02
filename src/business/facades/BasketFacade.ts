import IBasketRequester from "../requesters/IBasketRequester";
import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketProductOptionVM from "../models/viewmodels/BasketProductOptionVM";

export default class BasketFacade implements IBasketRequester {
    private readonly basketDataGateway: IBasketDataGateway;


    constructor(basketDataGateway: IBasketDataGateway) {
        this.basketDataGateway = basketDataGateway;
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

    public async getBasketProductOptions(basketId: string): Promise<Array<BasketProductOptionVM>> {
        const basketProductOptions = await this.basketDataGateway.getBasketProductOptions(basketId);
        return basketProductOptions.map(basketProductOption => new BasketProductOptionVM(basketProductOption.getProductOptionId(), basketProductOption.getQuantity()));
    }

    public async updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        if (!basketProductOption.getQuantity() || basketProductOption.getQuantity() <= 0) {
            throw new Error('error.basketQuantity');
        }
        await this.basketDataGateway.updateProductOptionBasket(basketProductOption);
    }
}