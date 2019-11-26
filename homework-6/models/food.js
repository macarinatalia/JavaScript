const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    ingridients: {
        type: [],
        required: true
    },
    weight: String
})



const FoodModel = mongoose.model('Food', FoodSchema)
module.exports = FoodModel

