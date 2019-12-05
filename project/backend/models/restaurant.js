const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    address: String,
    index: {
        type: Number,
        required: true,
        minlength: 5
    },
    visitors: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    }],
    menu: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Menu',
        autopopulate: {
            maxDepth: 1
        }
    },
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Review',
        autopopulate: {
            maxDepth: 1
        }
    }],
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        autopopulate: {
            maxDepth: 1
        }
    }],
    img: String
})

RestaurantSchema.plugin(require('mongoose-autopopulate'))
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)
module.exports = RestaurantModel




