"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductOptionUpdateDS {
    constructor(productOptionId, code, nameFr, nameEn, weight, stock, active, preorder, featured) {
        this.productOptionId = productOptionId;
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