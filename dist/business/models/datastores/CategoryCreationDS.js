"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryCreationDS {
    constructor(nameFr, nameEn, parentCategoryId, customerId) {
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.parentCategoryId = parentCategoryId;
        this.customerId = customerId;
    }
    getNameFr() {
        return this.nameFr;
    }
    getNameEn() {
        return this.nameEn;
    }
    getParentCategoryId() {
        return this.parentCategoryId;
    }
    getCustomerId() {
        return this.customerId;
    }
}
exports.default = CategoryCreationDS;
//# sourceMappingURL=CategoryCreationDS.js.map