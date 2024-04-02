import BasketProductOptionVM from "../viewmodels/BasketProductOptionVM.ts";

export default class BasketProductOptionParser {
    public static parseBasketProductOptions(data: any): Array<BasketProductOptionVM> {
        return data.map((basketProductOption: any) => new BasketProductOptionVM(basketProductOption.productOptionId, basketProductOption.quantity));
    }
}