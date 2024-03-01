"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductUpdateDS {
    constructor(productId, customerId, manufacturerId, code, nameFr, nameEn, descriptionFr, descriptionEn) {
        this.productId = productId;
        this.customerId = customerId;
        this.manufacturerId = manufacturerId;
        this.code = code;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.descriptionFr = descriptionFr;
        this.descriptionEn = descriptionEn;
    }
    getProductId() {
        return this.productId;
    }
    getCustomerId() {
        return this.customerId;
    }
    getManufacturerId() {
        return this.manufacturerId;
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
    getDescriptionFr() {
        return this.descriptionFr;
    }
    getDescriptionEn() {
        return this.descriptionEn;
    }
}
exports.default = ProductUpdateDS;
//# sourceMappingURL=ProductUpdateDS.js.map