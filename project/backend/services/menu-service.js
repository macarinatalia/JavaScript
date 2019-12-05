const BaseService = require('./base-service')
const MenuModel = require('../models/menu')

class MenuService extends BaseService {
    model = MenuModel

    async createMenu(restaurant, food, price) {
        const name = restaurant.name + ' Menu'
        const menuParam = {
            name: name, 
            restaurant: restaurant, 
            food: food,
            price: price
        }
        const menu = await this.add(menuParam).catch((err) => console.log(err));
        return menu
    }

    // async changePrice(food, newPrice){

    // }
}

module.exports = new MenuService()
