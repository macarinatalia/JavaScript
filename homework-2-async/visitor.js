module.exports = class Visitor{
    constructor (name){
        this.name = name
        this.orders = []
    }

    visit(restaurant){
        this.restaurant = restaurant
        restaurant.visitors.push(this.name)
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
