import ProductOptionStoreVM from "../viewmodels/ProductOptionStoreVM.ts";
import TitleValueParser from "./TitleValueParser.ts";

export default class ProductOptionStoreParser {

    public static parseProductOptionStore(data: any): ProductOptionStoreVM {
        let startDate: Date = null;
        let endDate: Date = null;
        if (data.startDateDiscount) {
            startDate = new Date(data.startDateDiscount);
        }
        if (data.endDateDiscount) {
            endDate = new Date(data.endDateDiscount);
        }

        const allOptions = TitleValueParser.parseTitleValues<string, string>(data.allOptions);
        return new ProductOptionStoreVM(
            data.productOptionId,
            data.productId,
            data.hasStock,
            data.weight,
            data.manufacturer,
            data.preorder,
            data.basePrice,
            data.discountPrice,
            data.percent,
            startDate,
            endDate,
            data.title,
            data.description,
            data.pictures,
            allOptions
        );
    }
}