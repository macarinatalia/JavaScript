const mongoose = require('mongoose')

const MenuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    food: {
        type: [],
        required: true
    },
    price: {
        type: [],
        required: true
    }
})

MenuSchema.plugin(require('mongoose-autopopulate'))

const MenuModel = mongoose.model('Menu', MenuSchema)
module.exports = MenuModel
