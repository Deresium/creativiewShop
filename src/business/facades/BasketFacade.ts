import IBasketRequester from "../requesters/IBasketRequester";
import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketProductOptionVM from "../models/viewmodels/BasketProductOptionVM";

export default class BasketFacade implements IBasketRequester {
    private readonly basketDataGateway: IBasketDataGateway;


    constructor(basketDataGateway: IBasketDataGateway) {
        this.basketDataGateway = basketDataGateway;
    }

    public async addOpenBasket(): Promise<string> {
        return await this.basketDataGateway.addBasket();
    }

    public async addOpenBasketIfNotExists(userId: string): Promise<string> {
        const basket = await this.basketDataGateway.findOpenBasketForUser(userId);
        if(basket){
            return basket.getBasketId();
        }
        return await this.basketDataGateway.addBasketForUser(userId);
    }

    public async addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        await this.basketDataGateway.addProductOptionToBasket(basketProductOption);
    }

    public async deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void> {
        await this.basketDataGateway.deleteProductOptionBasket(basketId, productOptionId);
    }

    public async getBasketProductOptions(basketId: string): Promise<Array<BasketProductOptionVM>> {
        const basketProductOptions = await this.basketDataGateway.getBasketProductOptions(basketId);
        return basketProductOptions.map(basketProductOption => new BasketProductOptionVM(basketProductOption.getProductOptionId(), basketProductOption.getQuantity()));
    }

    public async isOpenBasket(basketId: string): Promise<boolean> {
        return await this.basketDataGateway.isBasketOpen(basketId);
    }

    public async updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        await this.basketDataGateway.updateProductOptionBasket(basketProductOption);
    }
}