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
const ProductOptionEntity_1 = __importDefault(require("../entities/ProductOptionEntity"));
const sequelize_1 = require("sequelize");
const ProductEntity_1 = __importDefault(require("../entities/ProductEntity"));
const ProductOptionPriceEntity_1 = __importDefault(require("../entities/ProductOptionPriceEntity"));
class ProductOptionDataMapper {
    createProductOption(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productOption = yield ProductOptionEntity_1.default.create({
                productId: productId,
                preorder: false,
                featured: false,
                active: false
            });
            return productOption.getProductOptionId();
        });
    }
    deleteProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductOptionEntity_1.default.update({
                deletedAt: Date.now()
            }, {
                where: {
                    productOptionId: productOptionId
                }
            });
        });
    }
    getProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionEntity_1.default.findByPk(productOptionId);
        });
    }
    getProductOptionIdByCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ProductOptionEntity_1.default.findAll({
                attributes: ['productOptionId'],
                where: {
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    }
                },
                include: [{ model: ProductEntity_1.default, where: { customerId: customerId } }]
            });
            return response.map(productOption => productOption.getProductOptionId());
        });
    }
    getProductOptionByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionEntity_1.default.findAll({
                where: {
                    productId: productId,
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    }
                },
                include: [{
                        model: ProductOptionPriceEntity_1.default, as: 'productOptionPrices', where: {
                            endDate: { [sequelize_1.Op.eq]: null }
                        }
                    }]
            });
        });
    }
    updateProductOption(productOptionUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductOptionEntity_1.default.update({
                code: productOptionUpdate.getCode(),
                nameFr: productOptionUpdate.getNameFr(),
                nameEn: productOptionUpdate.getNameEn(),
                weight: productOptionUpdate.getWeight(),
                stock: productOptionUpdate.getStock(),
                active: productOptionUpdate.getActive(),
                preorder: productOptionUpdate.getPreorder(),
                featured: productOptionUpdate.getFeatured()
            }, {
                where: {
                    productOptionId: productOptionUpdate.getProductOptionId()
                }
            });
        });
    }
}
exports.default = ProductOptionDataMapper;
//# sourceMappingURL=ProductOptionDataMapper.js.map