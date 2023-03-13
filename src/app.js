const express = require('express')
const cartRoutes = require('./routers/carts.rauter')
const productRouter = require('./routers/products.router')
const app = express()
const morgan = require('morgan')

const port = 3000

app.listen(port, ()=>{console.log(`Server on port ${port}`)})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/carts', cartRoutes)
app.use('/api/products', productRouter)