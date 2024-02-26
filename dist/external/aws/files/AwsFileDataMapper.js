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
Object.defineProperty(exports, "__esModule", { value: true });
class AwsFileDataMapper {
    constructor(awsOperations) {
        this.awsOperations = awsOperations;
    }
    getCategoryPicture(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.awsOperations.getFile(`category/${categoryId}`);
        });
    }
    deleteCategoryPicture(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.awsOperations.deleteFile(`category/${categoryId}`);
        });
    }
    saveCategoryPicture(categoryId, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.awsOperations.addFile(`category/${categoryId}`, picture);
        });
    }
}
exports.default = AwsFileDataMapper;
//# sourceMappingURL=AwsFileDataMapper.js.map