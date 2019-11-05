const BaseService = require('./base-service')
const RestaurantModel = require('../models/restaurant')

class RestaurantService extends BaseService {
    constructor() {
        super(RestaurantModel, `${__dirname}/../restaurant-database.json`)
    }
}

module.exports = new RestaurantService()