module.exports = class Visitor{
    constructor (name, orders = [], id){
        this.name = name
        this.orders = orders
        this.id = id
    }

    static create({name, orders, id}){
        return new Visitor(name, orders, id)
    }

    visit(restaurant){
        restaurant.visitors.push(this)
    }

    makeOrder(foods){
        for (let i = 0; i < foods.length; i++) {
            this.orders.push(foods[i])
        }
    }

    rateRestaurant(restaurant, review){
        this.restaurant = restaurant
        restaurant.reviews.push(review)
    }

    leaveRestaurant(restaurant){
        restaurant.sayByeToVisitor(this.name)
        for( var i = 0; i < restaurant.visitors.length; i++){ 
            if ( restaurant.visitors[i] === this.name) {
                restaurant.visitors.splice(i, 1); 
                restaurant.orders.splice(i,2);          //delete name and order
              i--;
              break;
            }
         }

         console.log('end')
    }
}
