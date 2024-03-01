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
const CategoryEntity_1 = __importDefault(require("../entities/CategoryEntity"));
const sequelize_1 = require("sequelize");
class CategoryDataMapper {
    addCategory(categoryCreationDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CategoryEntity_1.default.create({
                parentCategoryId: categoryCreationDS.getParentCategoryId(),
                nameFr: categoryCreationDS.getNameFr(),
                nameEn: categoryCreationDS.getNameEn(),
                customerId: categoryCreationDS.getCustomerId()
            });
        });
    }
    updateCategory(categoryUpdateDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CategoryEntity_1.default.update({
                parentCategoryId: categoryUpdateDS.getParentCategoryId(),
                nameFr: categoryUpdateDS.getNameFr(),
                nameEn: categoryUpdateDS.getNameEn(),
            }, {
                where: {
                    categoryId: categoryUpdateDS.getCategoryId(),
                    customerId: categoryUpdateDS.getCustomerId()
                }
            });
        });
    }
    updateCategoryImageInfo(imageName, categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CategoryEntity_1.default.update({
                imageName: imageName
            }, {
                where: {
                    categoryId: categoryId,
                    customerId: customerId
                }
            });
        });
    }
    deleteCategory(categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CategoryEntity_1.default.update({
                deletedAt: Date.now()
            }, {
                where: {
                    categoryId: categoryId,
                    customerId: customerId
                }
            });
        });
    }
    getAllCategoriesOrderByParent(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryEntity_1.default.findAll({
                where: {
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    },
                    customerId: customerId
                },
                order: [
                    ['parentCategoryId', 'ASC NULLS FIRST']
                ]
            });
        });
    }
    getCategoryById(categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryEntity_1.default.findOne({
                where: {
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    },
                    categoryId: categoryId,
                    customerId: customerId
                }
            });
        });
    }
    getAllChildrenCategories(categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryEntity_1.default.findAll({
                where: {
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    },
                    parentCategoryId: categoryId,
                    customerId: customerId
                }
            });
        });
    }
}
exports.default = CategoryDataMapper;
//# sourceMappingURL=CategoryDataMapper.js.map