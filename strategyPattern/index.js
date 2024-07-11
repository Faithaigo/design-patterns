var DiscountType;
(function (DiscountType) {
    DiscountType[DiscountType["PERCENTAGE"] = 0] = "PERCENTAGE";
    DiscountType[DiscountType["AMOUNT"] = 1] = "AMOUNT";
})(DiscountType || (DiscountType = {}));
var NoDiscount = /** @class */ (function () {
    function NoDiscount() {
    }
    NoDiscount.prototype.applyDiscount = function (price) {
        return price;
    };
    return NoDiscount;
}());
var AmountDiscount = /** @class */ (function () {
    function AmountDiscount(amount) {
        this.amount = amount;
    }
    AmountDiscount.prototype.applyDiscount = function (price) {
        if (this.amount > price) {
            throw new Error('Price should be more than the discount amount');
        }
        return price - this.amount;
    };
    return AmountDiscount;
}());
var PercentageDiscount = /** @class */ (function () {
    function PercentageDiscount(percentage) {
        this.percentage = percentage;
    }
    PercentageDiscount.prototype.applyDiscount = function (price) {
        var disount_amount = price * (this.percentage / 100);
        return price - disount_amount;
    };
    return PercentageDiscount;
}());
var TotalPrice = /** @class */ (function () {
    function TotalPrice(scenario) {
        this.scenario = scenario;
    }
    TotalPrice.prototype.setScenario = function (scenario) {
        this.scenario = scenario;
    };
    TotalPrice.prototype.calculateTotalPrice = function (price) {
        return this.scenario.applyDiscount(price);
    };
    return TotalPrice;
}());
function unitPrice(price, percentage_type) {
    var noDiscount = new NoDiscount();
    var amountDiscount = new AmountDiscount(200);
    var percentageDiscount = new PercentageDiscount(10);
    var baseClass = new TotalPrice(noDiscount);
    switch (percentage_type) {
        case DiscountType.AMOUNT:
            baseClass.setScenario(amountDiscount);
            return baseClass.calculateTotalPrice(price);
        case DiscountType.PERCENTAGE:
            baseClass.setScenario(percentageDiscount);
            return baseClass.calculateTotalPrice(price);
        default:
            return baseClass.calculateTotalPrice(price);
    }
}
console.log('Amount Discount', unitPrice(1000, DiscountType.AMOUNT));
console.log('Percentage Discount', unitPrice(1000, DiscountType.PERCENTAGE));
console.log('No Discount', unitPrice(1000));
