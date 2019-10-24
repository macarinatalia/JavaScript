Customer = class {
    constructor (name){
        this.name = name
        this.order = []
    }

    visit(restaurant){
        this.restaurant = restaurant
        restaurant.visitors.push(this)
    }

    makeOrder(food){
        this.order.push(food)
    }

    rateRestaurant(restaurant, review){
        this.restaurant = restaurant
        restaurant.review.push(review)
    }
}

Restaurant = class {
    constructor (name, address){
        this.name = name,
        this.address = address,
        this.visitors = []
        this.menu = []
        this.review = []
    }

    addToMenu(food){
        this.menu.push(food)
    } 

}

Food = class {
    constructor(name){
        this.name = name
    }
}

printName = food => console.log(food.name)


john = new Customer('John')

mcdonalds = new Restaurant('McDonalds','Alexanderpl.8')

burger = new Food ('Burger')
chips = new Food ('Chips')
cola = new Food ('Cola')
icecream = new Food ('Icecream')

mcdonalds.addToMenu(burger)
mcdonalds.addToMenu(chips)
mcdonalds.addToMenu(cola)
mcdonalds.addToMenu(icecream)


john.visit(mcdonalds)
john.makeOrder(burger)
john.makeOrder(cola)

// make review based on food
john.rateRestaurant(mcdonalds,'3*')
