"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileVM {
    constructor(file, contentType, fileName) {
        this.file = file;
        this.contentType = contentType;
        this.fileName = fileName;
    }
    getFile() {
        return this.file;
    }
    getContentType() {
        return this.contentType;
    }
    getFileName() {
        return this.fileName;
    }
}
exports.default = FileVM;
//# sourceMappingURL=FileVM.js.map