import Decimal from "decimal.js";

export default class PercentCalculator {
    public static calculatePercentBasedOnPrices(originalPrice: Decimal, discountPrice: Decimal): Decimal {
        const numerator = originalPrice.minus(discountPrice);
        const fraction = numerator.dividedBy(originalPrice);
        return fraction.mul(100);
    }

    public static calculateDiscountPriceBasedOnPercent(originalPrice: Decimal, percent: Decimal): Decimal {
        const minus = new Decimal(100).minus(percent);
        const numerator = minus.mul(originalPrice);
        return numerator.dividedBy(100);
    }
}