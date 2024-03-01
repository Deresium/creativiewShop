import ProductVM from "../viewmodels/ProductVM.ts";

export default class ProductParser {
    public static parseProducts(data: any): Array<ProductVM> {
        return data.map((product: any) => ProductParser.parseProduct(product));
    }

    public static parseProduct(data: any): ProductVM {
        return new ProductVM(data.productId, data.customerId, data.manufacturerId, data.manufacturerName, data.code, data.nameFr, data.nameEn, data.descriptionFr, data.descriptionEn);
    }
}