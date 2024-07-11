enum DiscountType{
    PERCENTAGE,
    AMOUNT,
}

interface IApplyDiscount{
    applyDiscount(price:number):number
}

class NoDiscount implements IApplyDiscount{
    applyDiscount(price: number): number {
        return price
    }
}

class AmountDiscount implements IApplyDiscount{
    private amount: number;

    constructor(amount: number){
        this.amount = amount
    }

    applyDiscount(price: number): number {
        if(this.amount > price){
            throw new Error('Price should be more than the discount amount')
        }
        return price - this.amount
    }
}

class PercentageDiscount implements IApplyDiscount{
    private percentage: number

    constructor(percentage:number) {
        this.percentage = percentage
    }

    applyDiscount(price: number): number {
        const disount_amount:number = price * (this.percentage / 100)
        return price - disount_amount
    }
}

class TotalPrice{
    private scenario:IApplyDiscount

    constructor(scenario:IApplyDiscount){
        this.scenario  = scenario
    }

    setScenario(scenario:IApplyDiscount){
        this.scenario = scenario
    }

    calculateTotalPrice(price:number){
        return this.scenario.applyDiscount(price)
    }

}


function unitPrice(price:number,percentage_type?:DiscountType) : number {
    const noDiscount = new NoDiscount()
    const amountDiscount = new AmountDiscount(200)
    const percentageDiscount = new PercentageDiscount(10)

    const baseClass = new TotalPrice(noDiscount)

    switch (percentage_type) {
        case DiscountType.AMOUNT:
            baseClass.setScenario(amountDiscount)
            return baseClass.calculateTotalPrice(price)  
        case DiscountType.PERCENTAGE:
            baseClass.setScenario(percentageDiscount)
            return baseClass.calculateTotalPrice(price)  
        default:
            return baseClass.calculateTotalPrice(price)
    } 
}


console.log('Amount Discount', unitPrice(1000, DiscountType.AMOUNT))
console.log('Percentage Discount', unitPrice(1000, DiscountType.PERCENTAGE))
console.log('No Discount', unitPrice(1000))

