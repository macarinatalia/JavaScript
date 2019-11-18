const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 2
    },
    address: String,
    index: {
        type: Number,
        required: true,
        minlenght: 5
    },
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        autopopulates: {
            maxDepth: 1
        }
    }]
})

UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel


