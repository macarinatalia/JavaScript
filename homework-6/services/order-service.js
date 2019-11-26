const BaseService = require('./base-service')
const OrderModel = require('../models/order')


class OrderService extends BaseService {
    model = OrderModel

    async createNewOrder(user, restaurant, food) {
        const order = await this.add({user: user, restaurant: restaurant, food: food})
        // user.orders.push(order)
        // restaurant.orders.push(order)
        // restaurant.visitors.push(user)
        // await user.save()
        // await restaurant.save()
        return order
    }
}

module.exports = new OrderService()
