var listify = require('listify');

module.exports = class Restaurant{
    constructor (name, address){
        this.name = name,
        this.address = address,
        this.visitors = []
        this.menu = []
        this.reviews = []
        this.orders = []
    }

    addToMenu(food){
        this.menu.push(food)
    } 

    greetVisitor(visitor) {
        console.log("Hello " + visitor.name + ". Welcome to " + this.name)
    }

    printVisitors(){
        this.visitors.forEach(printName)
    }

    createOrder(visitor, foods){
        this.orders.push(visitor.name, foods)
    }


    printOrder(visitor){
        console.log('---------------------------------')
        console.log('\nOrder for ' + visitor.name + ':')
        for (let i = 0; i < this.orders.length; i++) {
            if(this.orders[i] == visitor.name) 
            console.log(listify(this.orders[i+1]))
        }
    }

    sayByeToVisitor = function(name) {
        console.log("Bye " + name)
    }
}

printName = visitor => console.log(visitor.name)
