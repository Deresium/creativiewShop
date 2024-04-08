import IBasketRequester from "../requesters/IBasketRequester";
import IBasketDataGateway from "../../database/gateways/IBasketDataGateway";
import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketVM from "../models/viewmodels/BasketVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import IProductOptionRequester from "../requesters/IProductOptionRequester";
import ProductOptionBasketVM from "../models/viewmodels/ProductOptionBasketVM";
import BasketErrorReportVM from "../models/viewmodels/BasketErrorReportVM";
import BasketChecker from "../utils/BasketChecker";
import ProductOptionDataMapper from "../../database/datamappers/ProductOptionDataMapper";

export default class BasketFacade implements IBasketRequester {
    private readonly basketDataGateway: IBasketDataGateway;
    private readonly productOptionRequester: IProductOptionRequester;
    private readonly productOptionDataMapper: ProductOptionDataMapper;


    constructor(basketDataGateway: IBasketDataGateway, productOptionRequester: IProductOptionRequester, productOptionDataMapper: ProductOptionDataMapper) {
        this.basketDataGateway = basketDataGateway;
        this.productOptionRequester = productOptionRequester;
        this.productOptionDataMapper = productOptionDataMapper;
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
        const basketProductOptions = await this.basketDataGateway.getBasketProductOptions(basketId);
        const productOptionBaskets = new Array<ProductOptionBasketVM>();
        let totalBasket = 0;
        for (const basketProductOption of basketProductOptions) {
            const productOptionStore = await this.productOptionRequester.getProductOptionStore(basketProductOption.getProductOptionId(), groupIds, customer, currency, language);
            let price = Number(productOptionStore.getBasePrice());
            if (productOptionStore.getDiscountPrice()) {
                price = Number(productOptionStore.getDiscountPrice());
            }
            const total = (price * basketProductOption.getQuantity());
            totalBasket += total;
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
        return new BasketVM(basketId, productOptionBaskets, totalBasket.toFixed(2));
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
}