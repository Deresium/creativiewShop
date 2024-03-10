"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PercentCalculator {
    static calculatePercentBasedOnPrices(originalPrice, discountPrice) {
        return ((originalPrice - discountPrice) / originalPrice) * 100;
    }
}
exports.default = PercentCalculator;
//# sourceMappingURL=PercentCalculator.js.map