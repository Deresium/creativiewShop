"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationRouter_1 = __importDefault(require("./ApplicationRouter"));
class PublicFileRouter extends ApplicationRouter_1.default {
    constructor() {
        super();
    }
    initRoutes() {
        // init public files get routes (images, pdf, ...)
    }
}
exports.default = PublicFileRouter;
//# sourceMappingURL=PublicFileRouter.js.map