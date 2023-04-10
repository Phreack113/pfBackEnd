const mongoose = require('mongoose')

const collectionName = 'cart'

const collectionSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product'
                },
                qty: {
                    type: Number
                }
            }
        ],
        default: []
    }
})

const Carts = mongoose.model(collectionName, collectionSchema)

module.exports = Carts