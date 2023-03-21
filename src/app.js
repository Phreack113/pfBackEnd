const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const router = require('./routers/index')
const { Server } = require('socket.io')

const { productManager } = require('../src/routers/controllers/controller.products')

const port = 3000

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

const httpServer = app.listen(port, () => {
    console.log(`Server on port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', async socket => {
    const products = await productManager.getProducts()
    socket.emit('realtimeproducts', { products })
})
