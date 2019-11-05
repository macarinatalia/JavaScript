var listify = require('listify');

module.exports = class Restaurant{
    constructor (name, address, visitors = [], menu = [], reviews = [], orders = []){
        this.name = name,
        this.address = address,
        this.visitors = visitors
        this.menu = menu
        this.reviews = reviews
        this.orders = orders
    }

    static create({ name, address, visitors, menu, reviews, orders }) {
        return new Restaurant(name, address, visitors, menu, reviews, orders)
      }

    addToMenu(food){
        this.menu.push(food)
    } 

    greetVisitor(visitor) {
        console.log("Hello " + visitor.name + ". Welcome to " + this.name)
    }

    printVisitors(){
        this.visitors.forEach(function(item){
            console.log(item)
        })
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

