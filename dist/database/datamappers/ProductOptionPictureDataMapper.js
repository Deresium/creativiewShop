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
const ProductOptionPictureEntity_1 = __importDefault(require("../entities/ProductOptionPictureEntity"));
class ProductOptionPictureDataMapper {
    addProductOptionPicture(productOptionId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const productOptionPicture = yield ProductOptionPictureEntity_1.default.create({
                productOptionId: productOptionId,
                name: name
            });
            return productOptionPicture.getProductOptionPictureId();
        });
    }
    deleteProductOptionPicture(productOptionPictureId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductOptionPictureEntity_1.default.destroy({
                where: {
                    productOptionPictureId: productOptionPictureId
                }
            });
        });
    }
    getPicturesForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionPictureEntity_1.default.findAll({
                where: {
                    productOptionId: productOptionId
                }
            });
        });
    }
    getProductOptionPicture(productOptionPictureId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductOptionPictureEntity_1.default.findOne({
                where: {
                    productOptionPictureId: productOptionPictureId
                }
            });
        });
    }
}
exports.default = ProductOptionPictureDataMapper;
//# sourceMappingURL=ProductOptionPictureDataMapper.js.map