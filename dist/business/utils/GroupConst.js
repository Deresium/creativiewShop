"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GroupConst {
    static hasAccessTo(askedAccess, listAccess) {
        if (listAccess === null || listAccess.length === 0) {
            return false;
        }
        return listAccess.includes(askedAccess);
    }
}
GroupConst.ADMIN_STORE = '1';
exports.default = GroupConst;
//# sourceMappingURL=GroupConst.js.map