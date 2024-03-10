export default class PercentCalculator {
    public static calculatePercentBasedOnPrices(originalPrice: number, discountPrice: number): number {
        return ((originalPrice - discountPrice) / originalPrice) * 100;
    }
}