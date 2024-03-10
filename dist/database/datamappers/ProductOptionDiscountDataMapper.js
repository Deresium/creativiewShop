"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductOptionDiscountEntity_1 = __importDefault(require("../entities/ProductOptionDiscountEntity"));
class ProductOptionDiscountDataMapper {
    addProductOptionDiscount(productOptionDiscountDs) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductOptionDiscountEntity_1.default.create({
                productOptionId: productOptionDiscountDs.getProductOptionId(),
                groupId: productOptionDiscountDs.getGroupId(),
                percent: productOptionDiscountDs.getPercent(),
                startDate: productOptionDiscountDs.getStartDate(),
                endDate: productOptionDiscountDs.getEndDate()
            });
        });
    }
    deleteProductOptionDiscount(productOptionDiscountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            yield ProductOptionDiscountEntity_1.default.update({
                deletedAt: now
            }, { where: { productOptionDiscountId: productOptionDiscountId } });
        });
    }
    getDiscountsForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionDiscountEntity_1.default.findAll({
                where: {
                    productOptionId: productOptionId
                }
            });
        });
    }
}
exports.default = ProductOptionDiscountDataMapper;
//# sourceMappingURL=ProductOptionDiscountDataMapper.js.map