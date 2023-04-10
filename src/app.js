const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const router = require('./routers/index')
const { Server } = require('socket.io')
const { port } = require('../config/server.config')
const mongoose = require('mongoose')
const dbConnect = require('../db')

const Products = require('./dao/models/Products.model')
const Messages = require('./dao/models/Messages.model')

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

dbConnect()

const httpServer = app.listen(port, () => {
    console.log(`Server on port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', async socket => {
    try {
        const products = await Products.find()
        socket.emit('realtimeproducts', { products })
    } catch (error) {
        socket.emit('realtimeproducts', {error: 'Bad Request'})
    }
    
    socket.on('chat', async msg => {
        try {
            const message = await Messages.create(msg)
            io.emit('chat', {message})
        } catch (error) {
            console.log(error)
        }
    })
})

