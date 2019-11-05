var listify = require('listify');
const Visitor = require('./visitor');

module.exports = class Restaurant{
    constructor (name, address, visitors = [], menu = [], reviews = [], orders = [], id){
        this.name = name,
        this.address = address,
        this.visitors = visitors
        this.menu = menu
        this.reviews = reviews
        this.orders = orders
        this.id = id
    }

    static create({ name, address, visitors, menu, reviews, orders, id }) {
        const restaurant = new Restaurant(name, address, visitors, menu, reviews, orders, id)
        restaurant.visitors = visitors.map(Visitor.create)

        return restaurant
      }

    report() {
        console.log(this.name, ' restaurant has ', this.visitors.length, ' visitors')
    }

    addToMenu(food){
        this.menu.push(food)
    } 

    greetVisitor(visitor) {
        console.log("Hello " + visitor.name + ". Welcome to " + this.name)
    }

    greetAllVisitors() {
        var names = this.visitors.map(function(visitor) {
            return visitor.name;
          });
        
        console.log("Hello " + names.join() + ". Welcome to " + this.name)
    }

    printVisitors(){
        if(this.visitors.length == 0) { 
            console.log(this.name, ' has no visitors')
            return
        }
        this.visitors.forEach(function(item){
            console.log(item.name)
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

