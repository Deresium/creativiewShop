"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserLoginVM {
    constructor(userId, userGroups) {
        this.userId = userId;
        this.userGroups = userGroups;
    }
    getUserId() {
        return this.userId;
    }
    getUserGroups() {
        return this.userGroups;
    }
}
exports.default = UserLoginVM;
//# sourceMappingURL=UserLoginVM.js.map