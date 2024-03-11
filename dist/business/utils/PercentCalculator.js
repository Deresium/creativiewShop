"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PercentCalculator {
    static calculatePercentBasedOnPrices(originalPrice, discountPrice) {
        return ((originalPrice - discountPrice) / originalPrice) * 100;
    }
    static calculateDiscountPriceBasedOnPercent(originalPrice, percent) {
        return ((100 - percent) * originalPrice) / 100;
    }
}
exports.default = PercentCalculator;
//# sourceMappingURL=PercentCalculator.js.map