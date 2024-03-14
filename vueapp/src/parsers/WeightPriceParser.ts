import WeightPriceVM from "../viewmodels/WeightPriceVM.ts";

export default class WeightPriceParser {
    public static parseWeightPrices(data: any): Array<WeightPriceVM> {
        return data.map((weightPrice: any) => WeightPriceParser.parseWeightPrice(weightPrice));
    }

    public static parseWeightPrice(data: any): WeightPriceVM {
        return new WeightPriceVM(data.gram, data.price, new Date(data.startDate));
    }
}