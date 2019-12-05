const BaseService = require('./base-service')
const RestaurantModel = require('../models/restaurant')

class RestaurantService extends BaseService {
    model = RestaurantModel

    async getAllRestaurantsByPostalCode(postalcode){
        const restaurants = await this.findByParameter({"index" : postalcode})
        return restaurants
    }
}

module.exports = new RestaurantService()
