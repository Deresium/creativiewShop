"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductOptionUpdateDS {
    constructor(productOptionId, productId, code, nameFr, nameEn, weight, stock, active, preorder, featured) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.code = code;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.weight = weight;
        this.stock = stock;
        this.active = active;
        this.preorder = preorder;
        this.featured = featured;
    }
    getProductOptionId() {
        return this.productOptionId;
    }
    getProductId() {
        return this.productId;
    }
    getCode() {
        return this.code;
    }
    getNameFr() {
        return this.nameFr;
    }
    getNameEn() {
        return this.nameEn;
    }
    getWeight() {
        return this.weight;
    }
    getStock() {
        return this.stock;
    }
    getActive() {
        return this.active;
    }
    getPreorder() {
        return this.preorder;
    }
    getFeatured() {
        return this.featured;
    }
}
exports.default = ProductOptionUpdateDS;
//# sourceMappingURL=ProductOptionUpdateDS.js.map