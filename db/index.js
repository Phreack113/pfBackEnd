const mongoose = require('mongoose')

const { dbUser, dbPassword, dbServer } = require('../config/db.config')

const dbConnect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@${dbServer}/?retryWrites=true&w=majority`
        )
        console.log('DB is connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect