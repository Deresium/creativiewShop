import PercentCalculator from "../business/utils/PercentCalculator";
import Decimal from "decimal.js";

describe('Test Percent Calculator', () => {
    test('original price 1000 discount 800', () => {
        const percent = PercentCalculator.calculatePercentBasedOnPrices(new Decimal(1000), new Decimal(800));
        expect(percent).toBe(20);
    });
    test('original price 500 discount 0', () => {
        const percent = PercentCalculator.calculatePercentBasedOnPrices(new Decimal(500), new Decimal(0));
        expect(percent).toBe(100);
    });
    test('original price 500 discount 800', () => {
        const percent = PercentCalculator.calculatePercentBasedOnPrices(new Decimal(500), new Decimal(800));
        expect(percent).toBe(-60);
    });
});