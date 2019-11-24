const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3
    },
    address: String,
    index: {
        type: Number,
        required: true,
        minlenght: 5
    },
    visitors: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulates: {
            maxDepth: 1
        }
    }],
    menu: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Menu',
        autopopulates: {
            maxDepth: 1
        }
    },
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Review',
        autopopulates: {
            maxDepth: 1
        }
    }],
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        autopopulates: {
            maxDepth: 1
        }
    }]
})

RestaurantSchema.plugin(require('mongoose-autopopulate'))
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)
module.exports = RestaurantModel




