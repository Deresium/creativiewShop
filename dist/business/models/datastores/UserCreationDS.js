"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserCreationDS {
    constructor(email, password, repeatPassword, name, firstName, customerId) {
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.name = name;
        this.firstName = firstName;
        this.customerId = customerId;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRepeatPassword() {
        return this.repeatPassword;
    }
    getName() {
        return this.name;
    }
    getFirstName() {
        return this.firstName;
    }
    getCustomerId() {
        return this.customerId;
    }
}
exports.default = UserCreationDS;
//# sourceMappingURL=UserCreationDS.js.map