export default class PercentCalculator {
    public static calculatePercentBasedOnPrices(originalPrice: number, discountPrice: number): number {
        return ((originalPrice - discountPrice) / originalPrice) * 100;
    }

    public static calculateDiscountPriceBasedOnPercent(originalPrice: number, percent: number): number {
        return ((100 - percent) * originalPrice) / 100;
    }
}