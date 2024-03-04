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
const ProductOptionCategoryEntity_1 = __importDefault(require("../entities/ProductOptionCategoryEntity"));
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionCategoryDataMapper {
    getProductOptionCategories(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionCategoryEntity_1.default.findAll({
                where: {
                    productOptionId: productOptionId,
                }
            });
        });
    }
    replaceCategories(productOptionId, listCategoriesId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DatabaseSingleton_1.default.getInstance().getSequelize().transaction((t) => __awaiter(this, void 0, void 0, function* () {
                yield ProductOptionCategoryEntity_1.default.destroy({
                    where: {
                        productOptionId: productOptionId
                    },
                    transaction: t
                });
                for (const categoryId of listCategoriesId) {
                    yield ProductOptionCategoryEntity_1.default.create({
                        categoryId: categoryId,
                        productOptionId: productOptionId
                    }, { transaction: t });
                }
            }));
        });
    }
}
exports.default = ProductOptionCategoryDataMapper;
//# sourceMappingURL=ProductOptionCategoryDataMapper.js.map