import ProductVM from "../viewmodels/ProductVM.ts";
import ProductListAdminVM from "../viewmodels/ProductListAdminVM.ts";
import ProductOptionListAdminVM from "../viewmodels/ProductOptionListAdminVM.ts";
import ProductOptionListAdminFlatVM from "../viewmodels/ProductOptionListAdminFlatVM.ts";

export default class ProductParser {
    public static parseProducts(data: any): Array<ProductVM> {
        return data.map((product: any) => ProductParser.parseProduct(product));
    }

    public static parseProduct(data: any): ProductVM {
        return new ProductVM(data.productId, data.customerId, data.manufacturerId, data.manufacturerName, data.code, data.nameFr, data.nameEn, data.descriptionFr, data.descriptionEn);
    }

    public static parseProductsAdminList(data: any): Array<ProductListAdminVM> {
        return data.map((product: any) => ProductParser.parseProductAdminList(product));
    }

    public static parseProductAdminList(data: any): ProductListAdminVM {
        const productOptions = new Array<ProductOptionListAdminVM>();
        for (const productOption of data.productOptions) {
            productOptions.push(new ProductOptionListAdminVM(productOption.nameFr, productOption.active, productOption.stock, productOption.price));
        }
        return new ProductListAdminVM(data.productId, data.customerId, data.manufacturerId, data.manufacturerName, data.code, data.nameFr, data.nameEn, data.descriptionFr, data.descriptionEn, productOptions);
    }

    public static parseProductsAdminListToFlatOptions(data: any): Array<ProductOptionListAdminFlatVM> {
        const productOptions = new Array<ProductOptionListAdminFlatVM>();
        for (const product of data) {
            for (const productOption of product.productOptions) {
                productOptions.push(new ProductOptionListAdminFlatVM(product.productId, product.manufacturerName, product.code, product.nameFr, productOption.nameFr, productOption.active, productOption.stock, productOption.price));
            }
        }
        return productOptions;
    }

}