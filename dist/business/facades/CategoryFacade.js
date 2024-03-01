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
const CategoryVM_1 = __importDefault(require("../models/viewmodels/CategoryVM"));
const CategoryFlatVM_1 = __importDefault(require("../models/viewmodels/CategoryFlatVM"));
const FileVM_1 = __importDefault(require("../models/viewmodels/FileVM"));
const ContentType_1 = __importDefault(require("../utils/ContentType"));
class CategoryFacade {
    constructor(categoryDataGateway, fileDataGateway) {
        this.categoryDataGateway = categoryDataGateway;
        this.fileDataGateway = fileDataGateway;
    }
    addCategory(categoryCreationDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryDataGateway.addCategory(categoryCreationDS);
        });
    }
    updateCategoryImage(image, imageName, categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fileDataGateway.saveCategoryPicture(categoryId, image);
                yield this.categoryDataGateway.updateCategoryImageInfo(imageName, categoryId, customerId);
            }
            catch (error) {
                console.error('facade operation aborded');
            }
        });
    }
    deleteCategory(categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.categoryDataGateway.deleteCategory(categoryId, customerId);
                yield this.fileDataGateway.deleteCategoryPicture(categoryId);
                const children = yield this.categoryDataGateway.getAllChildrenCategories(categoryId, customerId);
                for (const child of children) {
                    yield this.deleteCategory(child.getCategoryId(), customerId);
                }
            }
            catch (error) {
                console.error('facade operation aborded');
            }
        });
    }
    updateCategory(categoryUpdateDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryDataGateway.updateCategory(categoryUpdateDS);
        });
    }
    getAllCategories(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryDataGateway.getAllCategoriesOrderByParent(customerId);
            const returnCategories = new Array();
            const childrenListCategory = new Map();
            for (const category of categories) {
                const children = new Array();
                const categoryVM = new CategoryVM_1.default(category.getCategoryId(), category.getNameFr(), category.getNameEn(), category.getImageName(), children);
                childrenListCategory.set(category.getCategoryId(), children);
                if (category.getParentCategoryId() === null) {
                    returnCategories.push(categoryVM);
                }
                else {
                    childrenListCategory.get(category.getParentCategoryId()).push(categoryVM);
                }
            }
            return returnCategories;
        });
    }
    getAllCategoriesFlat(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryDataGateway.getAllCategoriesOrderByParent(customerId);
            const returnCategories = new Array();
            const childrenListCategory = new Map();
            for (const category of categories) {
                if (category.getParentCategoryId() === null) {
                    childrenListCategory.set(category.getCategoryId(), category.getNameFr());
                }
                else {
                    const flatName = `${childrenListCategory.get(category.getParentCategoryId())} > ${category.getNameFr()}`;
                    childrenListCategory.set(category.getCategoryId(), flatName);
                }
                const categoryFlatVM = new CategoryFlatVM_1.default(category.getCategoryId(), category.getNameFr(), category.getNameEn(), category.getImageName(), childrenListCategory.get(category.getCategoryId()), childrenListCategory.get(category.getParentCategoryId()), category.getParentCategoryId());
                returnCategories.push(categoryFlatVM);
            }
            return returnCategories;
        });
    }
    getCategoryImage(categoryId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryDataGateway.getCategoryById(categoryId, customerId);
            if (category && category.getImageName()) {
                const file = yield this.fileDataGateway.getCategoryPicture(categoryId);
                const extension = ContentType_1.default.determinateContentType(category.getImageName());
                return new FileVM_1.default(file, extension, category.getImageName());
            }
            return null;
        });
    }
}
exports.default = CategoryFacade;
//# sourceMappingURL=CategoryFacade.js.map