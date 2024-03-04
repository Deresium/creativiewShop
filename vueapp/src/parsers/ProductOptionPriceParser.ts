import ProductOptionPriceVM from "../viewmodels/ProductOptionPriceVM.ts";

export default class ProductOptionPriceParser {
    public static parsePrices(data: any): Array<ProductOptionPriceVM> {
        return data.map((price: any) => ProductOptionPriceParser.parsePrice(price));
    }

    public static parsePrice(data: any): ProductOptionPriceVM {
        let endDate: Date = null;
        if (data.endDate) {
            endDate = new Date(data.endDate);
        }
        return new ProductOptionPriceVM(new Date(data.startDate), endDate, data.price);
    }
}