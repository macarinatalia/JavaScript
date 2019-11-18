const BaseService = require('./base-service')
const FoodModel = require('../models/food')

class FoodService extends BaseService {
    model = FoodModel

    async getFoodArrayByIds(foodIds){
        const foodList = []
        for (var i = 0; i < foodIds.length; i++) {
            const f = await this.find(foodIds[i]).catch((err) => console.log(err));
            foodList.push(f)
        }
        
        return foodList
    }
}

module.exports = new FoodService()
