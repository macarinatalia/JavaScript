const BaseService = require('./base-service')
const MenuModel = require('../models/menu')

class MenuService extends BaseService {
    model = MenuModel

    async createMenu(restaurant, food, price) {
        const name = restaurant.name + ' Menu'
        restaurant.menu = await this.add({
                            name: name, 
                            restaurant: restaurant, 
                            food: food,
                            price: price
                        }).catch((err) => console.log(err));
        await restaurant.save()
    }

    async changePrice(food, newPrice){

    }
}

module.exports = new MenuService()
