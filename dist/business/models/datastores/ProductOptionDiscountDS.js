"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductOptionDiscountDS {
    constructor(productOptionId, groupId, percent, startDate, endDate) {
        this.productOptionId = productOptionId;
        this.groupId = groupId;
        this.percent = percent;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    getProductOptionId() {
        return this.productOptionId;
    }
    getGroupId() {
        return this.groupId;
    }
    getPercent() {
        return this.percent;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
}
exports.default = ProductOptionDiscountDS;
//# sourceMappingURL=ProductOptionDiscountDS.js.map