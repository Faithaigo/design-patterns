interface Iorder{
    calculatePrice():number;
}

interface IorderDecorator{
    calculatePrice():number;
}

class Order implements Iorder{
    private price:number
    constructor(price:number){
        this.price = price
    }
    calculatePrice(): number {
        return this.price
    }
}

class DiscountDecorator implements IorderDecorator{
    private order:Iorder
    private discount:number
    constructor(order:Iorder, discount:number){
        this.order = order
        this.discount = discount
    }
    calculatePrice(): number {
        const discount = this.order.calculatePrice() * (this.discount / 100)
        return this.order.calculatePrice() - discount
    }
}

class TaxDecorator implements IorderDecorator{
    private order:Iorder
    private tax:number
    constructor(order:Iorder, tax:number){
        this.order = order
        this.tax = tax
    }
    calculatePrice(): number {
        const discount = this.order.calculatePrice() * (this.tax / 100)
        return this.order.calculatePrice() + discount
    }
}

class ShippingDecorator implements IorderDecorator{
    private order:Iorder
    private shippingCost:number
    constructor(order:Iorder, shippingCost:number){
        this.order = order
        this.shippingCost = shippingCost
    }
    calculatePrice(): number {
        return this.order.calculatePrice() + this.shippingCost
    }
}

function getPrice() {
    const order  = new Order(2000)
    const applyDiscount = new DiscountDecorator(order, 15)
    const applyTax = new TaxDecorator(order, 18)
    const applyShipping = new ShippingDecorator(order,1000)
    const applyDiscountTax = new TaxDecorator(new DiscountDecorator(order, 10), 18)
    const applyTaxShipping = new TaxDecorator(new ShippingDecorator(order, 1000), 18)
    const applyDiscountTaxShipping = new ShippingDecorator(new TaxDecorator(new DiscountDecorator(order,10), 18), 1000)

    console.log('Basic order: ', order.calculatePrice())
    console.log('Order with discount: ', applyDiscount.calculatePrice())
    console.log('Order with tax: ', applyTax.calculatePrice())
    console.log('Order with shipping costs: ', applyShipping.calculatePrice())
    console.log('Order with tax and shipping costs: ', applyTaxShipping.calculatePrice())
    console.log('Order with discount and tax: ', applyDiscountTax.calculatePrice())
    console.log('Order with discount, tax and shipping costs: ', applyDiscountTaxShipping.calculatePrice())
}

getPrice()

