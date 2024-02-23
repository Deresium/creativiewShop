"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginInfoDS {
    constructor(email, customerId, password) {
        this.email = email;
        this.customerId = customerId;
        this.password = password;
    }
    getEmail() {
        return this.email;
    }
    getCustomerId() {
        return this.customerId;
    }
    getPassword() {
        return this.password;
    }
}
exports.default = LoginInfoDS;
//# sourceMappingURL=LoginInfoDS.js.map