"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryCreationDS_1 = __importDefault(require("./CategoryCreationDS"));
class CategoryUpdateDS extends CategoryCreationDS_1.default {
    constructor(nameFr, nameEn, parentCategoryId, categoryId, customerId) {
        super(nameFr, nameEn, parentCategoryId, customerId);
        this.categoryId = categoryId;
    }
    getCategoryId() {
        return this.categoryId;
    }
}
exports.default = CategoryUpdateDS;
//# sourceMappingURL=CategoryUpdateDS.js.map