const mongoose = require('mongoose')

const collectionName = 'user'

const collectionSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    age: Number,
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

const User = mongoose.model(collectionName, collectionSchema)

module.exports = User