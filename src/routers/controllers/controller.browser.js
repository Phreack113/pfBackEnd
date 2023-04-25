const { Router } = require('express')
const router = Router()

const Products = require('../../dao/models/Products.model')
const Carts = require('../../dao/models/Carts.model')
const privateAccess = require('../../middlewares/privateAccess.middleware')
const publicAccess = require('../../middlewares/publicAccess.middleware')

router.get('/', privateAccess, async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('home.handlebars', {
        products,
        title: 'Productos',
        style: 'style.css'
    })
})

router.get('/signin', publicAccess, async (req, res) => {
    res.render('signin.handlebars')
})

router.get('/login', publicAccess, async (req, res) => {
    res.render('login.handlebars')
})

router.get('/cart/:cid', privateAccess, async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await Carts.findById(cid).lean()
        console.log(cart)
        res.render('cart.handlebars', {
            cart,
            title: 'Carrito',
            style: 'style.css'
        })
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log(error)
    }
})

router.get('/realtimeproducts', privateAccess, async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('realtimeproducts.handlebars', {
        products,
        title: 'realtimeproducts',
        style: 'style.css'
    })
})

router.get('/products', privateAccess, async (req, res) => {

    const { limit = 10, page = 1 } = req.query

    const products = await Products.paginate({}, {limit, page, lean: true})
    const { docs: payload, totalPages, prevPage, nextPage, page : npage, hasPrevPage, hasNextPage } = products

    const resObj = {
        status: 'success',
        payload,
        totalPages, 
        prevPage, 
        nextPage, 
        npage, 
        hasPrevPage, 
        hasNextPage,
        prevLink: hasPrevPage ? `http://localhost:3002/products?limit=${limit}&page=${prevPage}` : null,
        nextLink: hasNextPage ? `http://localhost:3002/products?limit=${limit}&page=${nextPage}` : null
    }

    console.log(resObj)

    res.render('products.handlebars', {
        products: resObj,
        title: 'Productos',
        style: 'style.css'
    })
})

module.exports = router