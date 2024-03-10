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
const ProductOptionPriceEntity_1 = __importDefault(require("../entities/ProductOptionPriceEntity"));
const sequelize_1 = require("sequelize");
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
class ProductOptionPriceDataMapper {
    getPricesForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionPriceEntity_1.default.findAll({
                where: {
                    productOptionId: productOptionId
                },
                order: [
                    ['startDate', 'DESC']
                ]
            });
        });
    }
    updatePrice(productOptionId, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = Date.now();
            yield DatabaseSingleton_1.default.getInstance().getSequelize().transaction((t) => __awaiter(this, void 0, void 0, function* () {
                yield ProductOptionPriceEntity_1.default.update({
                    endDate: date
                }, {
                    where: {
                        productOptionId: productOptionId,
                        endDate: {
                            [sequelize_1.Op.eq]: null
                        }
                    },
                    transaction: t
                });
                yield ProductOptionPriceEntity_1.default.create({
                    price: price,
                    productOptionId: productOptionId,
                    startDate: date
                }, { transaction: t });
            }));
        });
    }
    getLastPriceForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionPriceEntity_1.default.findOne({
                where: {
                    productOptionId: productOptionId,
                    endDate: {
                        [sequelize_1.Op.eq]: null
                    }
                }
            });
        });
    }
}
exports.default = ProductOptionPriceDataMapper;
//# sourceMappingURL=ProductOptionPriceDataMapper.js.map