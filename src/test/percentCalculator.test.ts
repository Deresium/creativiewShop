import PercentCalculator from "../business/utils/PercentCalculator";

describe('Test Percent Calculator', () => {
    test('original price 1000 discount 800', () => {
        const percent = PercentCalculator.calculatePercentBasedOnPrices(1000, 800);
        expect(percent).toBe(20);
    });
    test('original price 500 discount 0', () => {
        const percent = PercentCalculator.calculatePercentBasedOnPrices(500, 0);
        expect(percent).toBe(100);
    });
    test('original price 500 discount 800', () => {
        const percent = PercentCalculator.calculatePercentBasedOnPrices(500, 800);
        expect(percent).toBe(-60);
    });
});