"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationMiddleware {
    constructor() {
        this.requestHandler = this.defineMiddlewareFunction();
    }
    getRequestHandler() {
        return this.requestHandler;
    }
}
exports.default = ApplicationMiddleware;
//# sourceMappingURL=ApplicationMiddleware.js.map