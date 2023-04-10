const mongoose = require('mongoose')

const collectionName = 'product'

const collectionSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: Array,
        default: []
    },
    stock: Number,
    category: String,
    status: {
        type: Boolean,
        default: true
    },
})

const Products = mongoose.model(collectionName, collectionSchema)

module.exports = Products

