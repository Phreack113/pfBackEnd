const cartController = require('./controllers/controller.carts')
const productController = require('./controllers/controller.products')
const browserProductController = require('./controllers/controller.browser')
const chatController = require('./controllers/controller.chat')
const usersController = require('./controllers/controller.users')
const authController = require('./controllers/controller.auth')

const router = app => {
    app.use('/auth', authController)
    app.use('/api/users', usersController)
    app.use('/api/carts', cartController)
    app.use('/api/products', productController)
    app.use('/', browserProductController)
    app.use('/', chatController)
}

module.exports = router