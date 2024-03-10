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
const ProductEntity_1 = __importDefault(require("../entities/ProductEntity"));
const sequelize_1 = require("sequelize");
const ManufacturerEntity_1 = __importDefault(require("../entities/ManufacturerEntity"));
const ProductOptionEntity_1 = __importDefault(require("../entities/ProductOptionEntity"));
const ProductOptionPriceEntity_1 = __importDefault(require("../entities/ProductOptionPriceEntity"));
class ProductDataMapper {
    createProduct(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductEntity_1.default.create({
                customerId: customerId
            });
            return product.getProductId();
        });
    }
    deleteProduct(productId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductEntity_1.default.update({
                deletedAt: Date.now()
            }, {
                where: {
                    productId: productId,
                    customerId: customerId
                }
            });
        });
    }
    getAllProduct(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductEntity_1.default.findAll({
                where: {
                    customerId: customerId,
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    }
                },
                include: { model: ManufacturerEntity_1.default, as: 'manufacturer', required: false }
            });
        });
    }
    getProduct(productId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductEntity_1.default.findOne({
                where: {
                    customerId: customerId,
                    productId: productId
                },
                include: { model: ManufacturerEntity_1.default, as: 'manufacturer', required: false }
            });
        });
    }
    getAllProductsAdmin(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductEntity_1.default.findAll({
                where: {
                    customerId: customerId,
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    }
                },
                include: [{
                        model: ManufacturerEntity_1.default, as: 'manufacturer', required: false
                    }, {
                        model: ProductOptionEntity_1.default,
                        as: 'productOptions',
                        where: { deletedAt: { [sequelize_1.Op.eq]: null } },
                        include: [{
                                model: ProductOptionPriceEntity_1.default,
                                as: 'productOptionPrices',
                                required: false,
                                where: { endDate: { [sequelize_1.Op.eq]: null } }
                            }]
                    }],
            });
        });
    }
    productExistsForCustomer(productId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield ProductEntity_1.default.count({
                where: {
                    customerId: customerId,
                    productId: productId
                }
            });
            return count === 1;
        });
    }
    updateProduct(productUpdateDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductEntity_1.default.update({
                manufacturerId: productUpdateDS.getManufacturerId(),
                code: productUpdateDS.getCode(),
                nameFr: productUpdateDS.getNameFr(),
                nameEn: productUpdateDS.getNameEn(),
                descriptionFr: productUpdateDS.getDescriptionFr(),
                descriptionEn: productUpdateDS.getDescriptionEn()
            }, {
                where: {
                    productId: productUpdateDS.getProductId(),
                    customerId: productUpdateDS.getCustomerId()
                }
            });
        });
    }
}
exports.default = ProductDataMapper;
//# sourceMappingURL=ProductDataMapper.js.map