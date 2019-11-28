const BaseService = require('./base-service')
const OrderModel = require('../models/order')
const Enums = require('../helpers/enums')


class OrderService extends BaseService {
    model = OrderModel

    async createNewOrder(user, restaurant, food) {
        const order = await this.add({user: user, 
                                    restaurant: restaurant, 
                                    food: food, 
                                    status: Enums.OrderStatus.OPEN
                                })
        user.orders.push(order._id)
        restaurant.orders.push(order._id)
        restaurant.visitors.push(user._id)
        await user.save()
        await restaurant.save()
        return order
    }

    async cancellOrder(order) {
        order.status = Enums.OrderStatus.CANCELLED
        await order.save()
        return order
    }

    async getOrdersByStatus(status) {
        const orders = await this.findByParameter({"status" : status})
        return orders
    }
}

module.exports = new OrderService()
