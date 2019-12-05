const BaseService = require('./base-service')
const UserModel = require('../models/user')
const RestaurantService = require('../services/restaurant-service')

class UserService extends BaseService {
    model = UserModel

    // async getAllRestaurants(user){
    //     const restaurants = await RestaurantService.findAll()

    //     var result = []
    //     restaurants.forEach(element => {
    //         if (element.index === user.index ) 
    //             result.push(element)
    //     });

    //     return result
    // }
}

module.exports = new UserService()
