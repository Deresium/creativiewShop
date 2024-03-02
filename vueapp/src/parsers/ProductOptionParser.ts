import ProductOptionVM from "../viewmodels/ProductOptionVM.ts";

export default class ProductOptionParser {
    public static parseProductOptions(data: any): Array<ProductOptionVM> {
        return data.map((product: any) => ProductOptionParser.parseProductOption(product));
    }

    public static parseProductOption(data: any): ProductOptionVM {
        return new ProductOptionVM(data.productOptionId, data.productId, data.nameFr, data.nameEn, data.code, data.stock, data.active, data.featured, data.click, data.weight, data.preorder);
    }
}