var currencyFormatter = require('currency-formatter');

module.exports = class Menu{
    constructor(name){
        this.name = name
        this.foods = []
        this.prices = []
    }

    addFoodToMenu(food, price){
        this.foods.push(food)
        this.prices.push(currencyFormatter.format(price,{ code: 'EUR' }) )
    }

    printMenu(){
        console.log('--------------------------------------------')
        console.log(this.name + ':')
        for (let i = 0; i < this.foods.length; i++) {
            console.log(this.foods[i] + ' - ' + this.prices[i])
        } 
    }
}