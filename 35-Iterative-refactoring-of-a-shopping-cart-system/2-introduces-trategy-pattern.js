/**
 * Strategy Pattern Implementation for Discounts
 * This refactoring introduces the Strategy Pattern to handle different discount strategies
 */
class NoDiscount {
    apply(price) {
        return price;
    }
}

class SummerDiscount {
    apply(price) {
        return price * 0.9;
    }
}

class DiscountContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    calculate(price) {
        return this.strategy.apply(price);
    }
}

// Discounts are now extensible and interchangeable
function calculateItemTotal(item, discountStrategy) {
    const basePrice = item.price * item.quantity;
    return discountStrategy.calculate(basePrice);
}
