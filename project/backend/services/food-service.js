const BaseService = require('./base-service')
const FoodModel = require('../models/food')

class FoodService extends BaseService {
    model = FoodModel

    async getFoodArrayByIds(foodIds){
        const param = { _id : { $in : foodIds }}
        const result =  await this.findByParameter( param )
        return result
    }
    
}

module.exports = new FoodService()
