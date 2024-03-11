"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerVM {
    constructor(customerId, name, dnsName, storeProtectionCode, firstColor, secondColor, thirdColor, currencyCode, currencySymbol) {
        this.customerId = customerId;
        this.name = name;
        this.dnsName = dnsName;
        this.storeProtectionCode = storeProtectionCode;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.thirdColor = thirdColor;
        this.currencyCode = currencyCode;
        this.currencySymbol = currencySymbol;
    }
    getCustomerId() {
        return this.customerId;
    }
    getName() {
        return this.name;
    }
    getDnsName() {
        return this.dnsName;
    }
    getStoreProtectionCode() {
        return this.storeProtectionCode;
    }
}
exports.default = CustomerVM;
//# sourceMappingURL=CustomerVM.js.map