require('dotenv').config()

module.exports = {
dbUser: process.env.DB_USER, 
dbPassword: process.env.DB_PASSWORD,
dbServer: process.env.DB_SERVER
}