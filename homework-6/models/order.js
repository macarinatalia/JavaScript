const mongoose = require('mongoose')
const Enums = require('../helpers/enums')

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    },
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        autopopulate: {
            maxDepth: 1
        }
    },
    food: [{ 
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Food',
        autopopulate: {
            maxDepth: 1
        }
    }],
    status: {
        type: String,
        enum: Object.values(Enums.OrderStatus),
        required: true,
    }
})


OrderSchema.plugin(require('mongoose-autopopulate'))

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel



