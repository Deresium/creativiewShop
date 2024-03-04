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
const FileVM_1 = __importDefault(require("../models/viewmodels/FileVM"));
const ContentType_1 = __importDefault(require("../utils/ContentType"));
class ProductOptionPictureFacade {
    constructor(productOptionPictureDataGateway, fileDataGateway) {
        this.productOptionPictureDataGateway = productOptionPictureDataGateway;
        this.fileDataGateway = fileDataGateway;
    }
    addProductOptionPicture(image, productOptionId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productOptionPictureId = yield this.productOptionPictureDataGateway.addProductOptionPicture(productOptionId, name);
                yield this.fileDataGateway.saveProductOptionPicture(productOptionPictureId, image);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    deleteProductOptionPicture(productOptionPictureId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productOptionPictureDataGateway.deleteProductOptionPicture(productOptionPictureId);
                yield this.fileDataGateway.deleteProductOptionPicture(productOptionPictureId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getPicturesForProductOption(productOptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pictures = yield this.productOptionPictureDataGateway.getPicturesForProductOption(productOptionId);
            return pictures.map(picture => picture.getProductOptionPictureId());
        });
    }
    getProductOptionPicture(productOptionPictureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const picture = yield this.productOptionPictureDataGateway.getProductOptionPicture(productOptionPictureId);
            if (picture && picture.getName()) {
                const file = yield this.fileDataGateway.getProductOptionPicture(productOptionPictureId);
                const extension = ContentType_1.default.determinateContentType(picture.getName());
                return new FileVM_1.default(file, extension, picture.getName());
            }
        });
    }
}
exports.default = ProductOptionPictureFacade;
//# sourceMappingURL=ProductOptionPictureFacade.js.map