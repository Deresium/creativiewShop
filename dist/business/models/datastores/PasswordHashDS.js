"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordHashDS {
    constructor(hashedPassword, salt) {
        this.hashedPassword = hashedPassword;
        this.salt = salt;
    }
    getHashedPassword() {
        return this.hashedPassword;
    }
    getSalt() {
        return this.salt;
    }
}
exports.default = PasswordHashDS;
//# sourceMappingURL=PasswordHashDS.js.map