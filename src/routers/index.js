const cartController = require('./controllers/controller.carts')
const { router: productController } = require('./controllers/controller.products')
const browserController = require('./controllers/controller.browser')

const router = app => {
    app.use('/api/carts', cartController)
    app.use('/api/products', productController)
    app.use('/', browserController)
}

module.exports = router