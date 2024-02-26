"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationMiddleware_1 = __importDefault(require("./ApplicationMiddleware"));
const GroupConst_1 = __importDefault(require("../../business/utils/GroupConst"));
class OnlyAdminStoreMiddleware extends ApplicationMiddleware_1.default {
    constructor() {
        super();
    }
    defineMiddlewareFunction() {
        return (req, res, next) => {
            if (GroupConst_1.default.hasAccessTo(GroupConst_1.default.ADMIN_STORE, req.userGroups)) {
                next();
                return;
            }
            res.status(401).send('Accès refusé');
        };
    }
}
exports.default = OnlyAdminStoreMiddleware;
//# sourceMappingURL=OnlyAdminMiddleware.js.map