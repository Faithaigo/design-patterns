/**
 * Utility functions, these can be definned in another file
 */

export interface UserPayment{
    amount:number
    userId:number
}




/**
 * Simulate db operations
 */
function findById(productId:string):Promise<string> {
    return new Promise((resolve, reject)=>{
        if(productId){
            resolve('Successfully updated inventory')
        }else{
            reject('Error occured')
        }
    })
}

/**
 * simulate operation to visit some external API
 */

function visitExternalAPI(userData:UserPayment):Promise<string> {
    return new Promise((resolve, reject)=>{
        if(userData.amount && userData.userId){
            resolve('Successfully processed payment')
        }else{
            reject('Failed to proceess payment')
        }
    })
}

export class Inventory {
    async updateDatabaseStock(productId:string){
        try {
            const product = await findById(productId)
            console.log(product)
        } catch (error) {
            console.log(error)
        } 
    }
}

export class Payment {

    async processPayment(userData:UserPayment){
        try {
            const payment = await visitExternalAPI(userData)
            console.log(payment)
        } catch (error) {
            console.log(error)
        } 
    }
}

export class Email {
    sendEmail():void{
        console.log('Email sent successfully')
    }
}



interface Observer{
    update(orderId:string):void
}

interface Observable{
    addObserver(observer:Observer):void
    removeObserver(observer:Observer):void
    notifyObservers(orderId:string):void
}

class UpdateInventory implements Observer{
    private productId:string
    constructor(productId:string){
        this.productId = productId

    }
    update(orderId: string): void {
        const inventory = new Inventory()
        inventory.updateDatabaseStock(this.productId)
    }
}

class ProcessPayment implements Observer{
    private userData:UserPayment
    constructor(userData:UserPayment){
        this.userData = userData
    }
    update(orderId: string): void {
        const payment = new Payment()
        payment.processPayment(this.userData)
    }
}

class SendEmail implements Observer{
    update(orderId: string): void {
        const email = new Email()
        email.sendEmail()
    }
}

class PlaceOrder implements Observable{
    private observers:Observer[] = []

    addObserver(observer: Observer): void {
        this.observers = [...this.observers, observer]
    }
    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs=>obs !== observer)
    }

    notifyObservers(orderId:string): void {
        this.observers.forEach(observer=>{
            observer.update(orderId)
        })
    }

    placeOrder(orderId:string){
        console.log('order placed successfully')
        this.notifyObservers(orderId)
    }

}

function OrderItems(orderId:string) {

    const productId = '123'
    const userData = {
        amount:5000,
        userId:2
    }
    const orderObservable = new PlaceOrder()

    const updateInventory = new UpdateInventory(productId)
    const processPayment = new ProcessPayment(userData)
    const sendEmail = new SendEmail()

    orderObservable.addObserver(updateInventory)
    orderObservable.addObserver(processPayment)
    orderObservable.addObserver(sendEmail)

    orderObservable.placeOrder(orderId)
}

OrderItems('order one')